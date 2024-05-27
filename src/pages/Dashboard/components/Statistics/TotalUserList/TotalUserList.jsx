import { Card, Row, Col, Typography } from 'antd';

const { Title, Text } = Typography;

const totalUsers = 10; // này phải call api nha

export const TotalUserList = () => {
  return (
    <div className='container' style={{ marginTop: '2rem' }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Title level={4}>Total Users</Title>
            <Text className='display-4' style={{ fontSize: '2rem' }}>
              {totalUsers}
            </Text>
          </Card>
        </Col>
        {/* Add more cards for other statistics as needed */}
      </Row>
    </div>
  );
};
