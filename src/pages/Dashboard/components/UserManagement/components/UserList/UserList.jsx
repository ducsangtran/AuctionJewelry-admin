import { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Pagination, Input } from 'antd';
import { fetchUsers, updateUser } from '@api/api.js';

const { Item: FormItem } = Form;
const { Column } = Table;

export const UserList = ({ setTotalUsers }) => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
        setTotalUsers(users.length); // Pass the number of users via props
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
  }, [setTotalUsers]);

  const handleShow = (user) => {
    setEditUser(user);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleSave = async () => {
    try {
      await updateUser(editUser);
      setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Table dataSource={currentUsers} rowKey='id' pagination={false} className='mb-4'>
        <Column title='ID' dataIndex='id' key='id' />
        <Column title='Name' dataIndex='name' key='name' />
        <Column title='Email' dataIndex='email' key='email' />
        <Column title='IdCard' dataIndex='IdCard' key='IdCard' />
        <Column title='Phone Number' dataIndex='phoneNumber' key='phoneNumber' />
        <Column
          title='Actions'
          key='actions'
          render={(text, user) => (
            <Button type='primary' onClick={() => handleShow(user)}>
              Edit
            </Button>
          )}
        />
      </Table>

      <div className='d-flex justify-content-center'>
        <Pagination
          current={currentPage}
          total={users.length}
          pageSize={usersPerPage}
          onChange={paginate}
        />
      </div>

      <Modal title='Edit User' visible={show} onCancel={handleClose} onOk={handleSave}>
        <Form layout='vertical'>
          <FormItem label='Name'>
            <Input type='text' name='name' value={editUser?.name || ''} onChange={handleChange} />
          </FormItem>
          <FormItem label='Email'>
            <Input
              type='email'
              name='email'
              value={editUser?.email || ''}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem label='IdCard'>
            <Input
              type='text'
              name='idCard'
              value={editUser?.idCard || ''}
              onChange={handleChange}
            />
          </FormItem>
          <FormItem label='Phone Number'>
            <Input
              type='text'
              name='phoneNumber'
              value={editUser?.phoneNumber || ''}
              onChange={handleChange}
            />
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
