import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Table,
  Space,
  Modal,
  message,
  Select,
  Descriptions,
  Row,
  Col,
  Typography,
  InputNumber,
} from 'antd';
import {
  deleteValuation,
  editValuating,
  getAllValuations,
  getAvailableStaff,
  getMyValuations,
  searchValuationById,
} from '../../../../../services/api/ValuationApi';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ConfirmDeleteModal from '../../../../../components/form/ConfirmDeleteModal';
import TextArea from 'antd/es/input/TextArea';
import { OnlineValuation } from './onlineValuation';

const { Option } = Select;
const { Title } = Typography;
const ValuationManagement = () => {
  const [form] = Form.useForm();
  const [valuationsData, setValuationsData] = useState([]);
  const [myValuationsData, setMyValuationsData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);
  const [staffIdFilter, setStaffIdFilter] = useState(null);
  const [staffsData, setStaffsData] = useState([]);
  const priceOnline = useSelector((state) => state.valuation.onlinePrice);
  const [valuationPrice, setValuationPrice] = useState(0);
  const validatePrices = (_, value) => {
    if (priceOnline === undefined) {
      return Promise.reject(new Error('Please input the online price first.'));
    }

    const valuationPrice = value;
    const lowerBound = priceOnline * 0.8;
    const upperBound = priceOnline * 1.2;

    if (valuationPrice < lowerBound || valuationPrice > upperBound) {
      return Promise.reject(
        new Error('Valuation price must be within ±20% of online price.')
      );
    }

    return Promise.resolve();
  };

  // Fetch user role from Redux store
  const userRole = useSelector((state) => state.auth.roleName);

  const userRoleId = useSelector((state) => state.auth.roleId);

  useEffect(() => {
    if (userRole === 'Manager' || userRole === 'Admin') {
      fetchAllValuations();
      fetchAvailableStaffs();
    } else {
      fetchMyValuations();
    }
    if (editingItem) {
      form.setFieldsValue({
        startingPrice:
          valuationPrice * 0.2 || form.getFieldsValue().valuation_value * 0.2,
      });
    }
  }, [editingItem, form, userRole, valuationPrice]);

  const fetchAvailableStaffs = async () => {
    try {
      const response = await getAvailableStaff();
      const staffsData = response.data;
      setStaffsData(staffsData);
    } catch (error) {
      message.error('Failed to fetch staff data.');
    }
  };

  const fetchAllValuations = async () => {
    try {
      const response = await getAllValuations();
      const valuationsData = response.data;
      setValuationsData(valuationsData);
    } catch (error) {
      console.error('Failed to fetch all valuations data:', error);
      message.error('Failed to fetch valuations data.');
    }
  };

  const fetchMyValuations = async () => {
    try {
      const response = await getMyValuations();
      const myValuationsData = response.data;
      setMyValuationsData(myValuationsData);
    } catch (error) {
      console.error('Failed to fetch my valuations data:', error);
    }
  };

  const handleStaffIdFilterChange = (value) => {
    setStaffIdFilter(value);
    filterValuationsByStaffId(value);
  };

  const filterValuationsByStaffId = async (staffId) => {
    if (!staffId) {
      if (userRole === 'Manager' || userRole === 'Admin') {
        fetchAllValuations();
      } else {
        fetchMyValuations();
      }
      return;
    }

    try {
      const filteredData = (
        userRole === 'Manager' || userRole === 'Admin'
          ? valuationsData
          : myValuationsData
      ).filter((item) => item.staff && item.staff.id === staffId);
      if (userRole === 'Manager' || userRole === 'Admin') {
        setValuationsData(filteredData);
      } else {
        setMyValuationsData(filteredData);
      }
    } catch (error) {
      message.error('Failed to filter valuations data.');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Jewelry',
      dataIndex: ['jewelry', 'name'],
      key: 'jewelry',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => moment(text).format('YY-MM-DD HH:mm'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Desired Price',
      dataIndex: 'desiredPrice',
      key: 'desiredPrice',
      sorter: (a, b) => a.desiredPrice - b.desiredPrice,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Valuating Fee',
      dataIndex: 'valuatingFee',
      key: 'valuatingFee',
      sorter: (a, b) => a.valuatingFee - b.valuatingFee,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Valuating Method',
      dataIndex: 'valuatingMethod',
      key: 'valuatingMethod',
    },
    {
      title: 'Valuation Value',
      dataIndex: 'valuation_value',
      key: 'valuation_value',
      sorter: (a, b) => a.valuation_value - b.valuation_value,
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Online',
      dataIndex: 'online',
      key: 'online',
      render: (text) => (text ? 'True' : 'False'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text) => moment(text).format('YY-MM-DD HH:mm'),
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    },
    {
      title: 'Staff Name',
      dataIndex: ['staff', 'full_name'],
      key: 'staffName',
      filters:
        userRole === 'Admin' || userRole === 'Manager'
          ? staffsData.map((staff) => ({
              text: staff.full_name,
              value: staff.id,
            }))
          : [],
      onFilter: (value, record) => record.staff && record.staff.id === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'VALUATING', value: 'VALUATING' },
        { text: 'VALUATED', value: 'VALUATED' },
        { text: 'REQUEST', value: 'REQUEST' },
        { text: 'PREPARING', value: 'PREPARING' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      render: (text) => (
        <span title={text}>
          {text.length > 30 ? `${text.substring(0, 30)}...` : text}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Button onClick={() => handleEdit(record)} type='primary'>
            Edit
          </Button>
          <Button
            onClick={() => showDeleteModal(record.id)}
            type='primary'
            danger
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      staffId: record.staff?.id,
      full_name: record.staff?.full_name,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteValuation(id);
      if (userRole === 'Manager' || userRole === 'Admin') {
        setValuationsData(valuationsData.filter((item) => item.id !== id));
      } else {
        setMyValuationsData(myValuationsData.filter((item) => item.id !== id));
      }
      message.success('Valuation deleted successfully.');
    } catch (error) {
      console.error('Failed to delete valuation:', error);
      message.error('Failed to delete valuation.');
    }
  };

  const showDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(deleteId);
    setDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingItem(null);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const {
        id,
        address,
        staffId,
        valuation_value,
        notes,
        status,
        desiredPrice,
        paymentMethod,
        valuatingMethod,
        startingPrice,
      } = values;
      const UpdatedItem = await editValuating(
        editingItem.id,
        address,
        staffId,
        valuation_value,
        notes,
        editingItem?.status === 'VALUATING' &&
          valuation_value > 0 &&
          startingPrice > 0 &&
          userRole !== 'Staff'
          ? 'VALUATED'
          : status,
        desiredPrice,
        paymentMethod,
        valuatingMethod,
        startingPrice
      );

      const updatedData = (
        userRole === 'Manager' || userRole === 'Admin'
          ? valuationsData
          : myValuationsData
      ).map((item) => (item.id === UpdatedItem.id ? UpdatedItem : item));

      if (userRole === 'Manager' || userRole === 'Admin') {
        setValuationsData(updatedData);
      } else {
        setMyValuationsData(updatedData);
      }

      form.resetFields();
      setModalVisible(false);
      setEditingItem(null);
      if (userRole === 'Manager' || userRole === 'Admin') {
        fetchAllValuations();
      } else {
        fetchMyValuations();
      }
      // Fetch available staff after updating valuation
      fetchAvailableStaffs();
      message.success('Success to update valuation.');
    } catch (error) {
      console.error('Failed to update valuation:', error);
      message.error('Failed to update valuation.');
    }
  };

  const onSearch = async (value) => {
    try {
      if (!value) {
        // If the search value is empty, fetch all valuations or my valuations based on role
        if (userRole === 'Manager' || userRole === 'Admin') {
          fetchAllValuations();
        } else {
          fetchMyValuations();
        }
        setSearchStatus(null);
      } else {
        const response = await searchValuationById(value);
        const data = response.data;
        if (Array.isArray(data) && data.length === 0) {
          setSearchStatus('No data found');
          if (userRole === 'Manager' || userRole === 'Admin') {
            setValuationsData([]);
          } else {
            setMyValuationsData([]);
          }
        } else {
          setSearchStatus(null);
          if (userRole === 'Manager' || userRole === 'Admin') {
            setValuationsData(Array.isArray(data) ? data : [data]);
          } else {
            setMyValuationsData(Array.isArray(data) ? data : [data]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to search valuation by ID:', error);
      message.error('Failed to search valuation, Id does not exist!');
      setSearchStatus('No data found');
      if (userRoleId === 1 || userRole === 'Admin') {
        setValuationsData([]);
      } else {
        setMyValuationsData([]);
      }
    }
  };

  const handleStaffChange = (value) => {
    form.setFieldsValue({
      status: 'PREPARING',
    });
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder='Search valuations by ID'
          onSearch={onSearch}
          enterButton
        />
      </Space>
      <Table
        columns={columns}
        dataSource={
          userRole === 'Manager' || userRole === 'Admin'
            ? valuationsData
            : myValuationsData
        }
        rowKey='id'
        pagination={{ pageSize: 5 }}
      />

      <Modal
        width={1500}
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={false}
        centered
      >
        {editingItem && editingItem.jewelry && (
          <Row gutter={16}>
            <Col span={userRole === 'Staff' ? 8 : 12}>
              <Descriptions title='Jewelry Details' bordered column={2}>
                <Descriptions.Item label='Name' span={2}>
                  {editingItem.jewelry.name}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Image" span={2}>
                                    {editingItem.jewelry.jewelryImages.url}
                                </Descriptions.Item> */}
                <Descriptions.Item label='Material' span={2}>
                  {editingItem.jewelry.jewelryMaterials[0]?.material.name}
                </Descriptions.Item>

                <Descriptions.Item label='Material Weight' span={1}>
                  {editingItem.jewelry.jewelryMaterials[0]?.weight}
                </Descriptions.Item>
                <Descriptions.Item label='Unit' span={1}>
                  {editingItem.jewelry.jewelryMaterials[0]?.material.unit}
                </Descriptions.Item>
                <Descriptions.Item label='Description' span={2}>
                  {editingItem.jewelry.description}
                </Descriptions.Item>
                <Descriptions.Item label='Jewelry Condition' span={1}>
                  {editingItem.jewelry.jewelryCondition}
                </Descriptions.Item>
                <Descriptions.Item label='Sex' span={1}>
                  {editingItem.jewelry.sex}
                </Descriptions.Item>

                <Descriptions.Item label='Jewelry Weight' span={1}>
                  {editingItem.jewelry.weight}
                </Descriptions.Item>
                <Descriptions.Item label='Unit' span={1}>
                  {editingItem.jewelry.jewelryMaterials[0]?.material.unit}
                </Descriptions.Item>
                <Descriptions.Item label='Brand' span={2}>
                  {editingItem.jewelry.brand.name}
                </Descriptions.Item>
                <Descriptions.Item label='Category' span={2}>
                  {editingItem.jewelry.category.name}
                </Descriptions.Item>
                <Descriptions.Item label='Collection' span={2}>
                  {editingItem.jewelry.collection.name}
                </Descriptions.Item>
                <Descriptions.Item label='Desired Price' span={2}>
                  {editingItem.desiredPrice}
                </Descriptions.Item>
                <Descriptions.Item label='Valuation At' span={4}>
                  {editingItem.address}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={userRole === 'Staff' ? 8 : 12}>
              <Title level={4}>Edit Valuation</Title>
              <Form
                labelCol={{
                  span: 24,
                }}
                form={form}
                onFinish={handleModalOk}
                initialValues={editingItem}
              >
                {userRole === 'Manager' || userRole === 'Admin' ? (
                  <Form.Item label='Staff' name='staffId'>
                    <Select
                      placeholder='Select a Staff'
                      onChange={handleStaffChange}
                      disabled={
                        editingItem?.status === 'VALUATED' ||
                        editingItem?.status === 'VALUATING'
                          ? true
                          : false
                      }
                    >
                      {staffsData.map((staff) => (
                        <Option key={staff.user.id} value={staff.user.id}>
                          {staff.user.full_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                ) : null}
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Must not be empty',
                    },
                    {
                      validator: validatePrices,
                    },
                  ]}
                  label='Valuation Value (within ±20% of online price)'
                  name='valuation_value'
                >
                  {userRole === 'Admin' || userRole === 'Manager' ? (
                    <InputNumber
                      controls={false}
                      readOnly
                      className='!w-full'
                    />
                  ) : (
                    <InputNumber
                      controls={false}
                      className='!w-full'
                      readOnly={editingItem?.status === 'VALUATED' ? true : false}
                      onChange={(e) => setValuationPrice(e)}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  label={`Starting Price (20% of valuation value)`}
                  name={'startingPrice'}
                >
                  {userRole === 'Admin' || userRole === 'Manager' ? (
                    <InputNumber
                      readOnly
                      controls={false}
                      className='!w-full'
                    />
                  ) : (
                    <InputNumber
                      controls={false}
                      readOnly
                      className='!w-full'
                    />
                  )}
                </Form.Item>
                <Form.Item label='Notes' name='notes'>
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                  label='Status'
                  name='status'
                  rules={[
                    { required: true, message: 'Please select your status!' },
                  ]}
                >
                  <Select
                    placeholder='Select your status'
                    disabled={
                      editingItem.status === 'VALUATING' ||
                      editingItem.status === 'VALUATED'
                        ? true
                        : false
                    }
                  >
                    {userRole === 'Admin' || userRole === 'Manager' ? (
                      <>
                        <Option value='REJECTED'>REJECTED</Option>
                        <Option value='PREPARING'>PREPARING</Option>
                      </>
                    ) : (
                      <Option value='VALUATING'>VALUATING</Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label='Payment Method' name='paymentMethod'>
                  <Input readOnly />
                </Form.Item>
                <Form.Item className='flex justify-center'>
                  <Button type='primary' htmlType='submit'>
                    {editingItem.status === 'VALUATING' &&
                    editingItem.valuation_value > 0 &&
                    editingItem.startingPrice > 0
                      ? 'Confirm Valuated'
                      : 'Edit Valuation'}
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            {userRole === 'Staff' && (
              <Col>
                {userRole === 'Staff' && (
                  <OnlineValuation id={editingItem?.jewelry?.id} />
                )}
              </Col>
            )}
          </Row>
        )}
      </Modal>

      <ConfirmDeleteModal
        visible={deleteModalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ValuationManagement;
