import { Divider, Flex, Modal, Spin, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { valuatingOnline } from '../../../../../services/api/ValuationApi';
import { setOnlinePrice } from '../../../../../core/store/slices/valuationSlice';
const { Title } = Typography;

export const OnlineValuation = ({ id }) => {
  const formatPriceVND = (price) =>
    price?.toLocaleString('vi', { style: 'currency', currency: 'VND' });

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Material',
      dataIndex: ['material', 'name'],
      key: 'material',
    },
    {
      title: 'Weight',
      key: 'weight',
      render: (data) => (
        <>
          {data.weight} {data.material.name === 'Diamond' ? 'karat' : 'g'}
        </>
      ),
    },
    {
      title: 'Price Per Material',
      dataIndex: ['price'],
      key: 'pricePerWeight',
      render: (data) => formatPriceVND(data)
    },
    {
      title: 'Total',
      dataIndex: ['sum'],
      key: 'totalPerMaterial',
      render: (data) => formatPriceVND(data)
    },
  ];

  useEffect(() => {
    const fetchMaterial = async () => {
      const data = {
        jewelryId: id,
        desiredPrice: 0,
        paymentMethod: 'VNPAY',
        notes: 'string',
        valuatingMethod: 'DIRECTLY_VALUATION',
        online: true,
      };
      try {
        setLoading(true);
        const response = await valuatingOnline(data);
        setData(response.data);
        console.log(response);
        setDataSource(response.data.materialPriceResponse);
        dispatch(setOnlinePrice(response.data.valuation_value));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchMaterial();
    }
  }, [dispatch, id]);
  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Title level={4} className='font-sans !font-semibold mt-2'>
            Name:{' '}
            <span className='text-red-500'>{data && data?.jewelry?.name}</span>
          </Title>
          <Table
            pagination={false}
            columns={columns}
            dataSource={data && dataSource}
            size='large'
          />
          <Flex className='mt-5' vertical gap={15}>
            <Title className='!m-0' level={5}>
              Total Weight: {data && data?.jewelry?.weight} g
            </Title>
            <Title className='!m-0' level={5}>
              Total Valuate:{' '}
              <span className='text-red-500 font-bold '>
                {formatPriceVND(data?.valuation_value)}
              </span>
            </Title>
          </Flex>
        </>
      )}
    </>
  );
};
