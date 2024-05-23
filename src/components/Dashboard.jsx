import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Dashboard = ({ totalUsers }) => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Dashboard</h2>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total Users</Card.Title>
                            <Card.Text className="display-4">
                                {totalUsers}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {/* Add more cards for other statistics as needed */}
            </Row>
        </div>
    );
};

export default Dashboard;
