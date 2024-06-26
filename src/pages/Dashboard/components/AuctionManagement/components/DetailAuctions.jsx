import React from "react";
import { Badge, Col, Descriptions, Modal, Row } from "antd";
import moment from "moment";

const formatDateTime = (dateTime) => moment(dateTime).format("YY-MM-DD HH:mm");

const DetailAuctions = ({ visible, onCancel, auction }) => (
    <Modal open={visible} onCancel={onCancel} footer={null} width={1500}>
        {auction && (
            <Row gutter={16}>
                <Col span={12}>
                    <Descriptions title="Auctions Details" bordered column={2}>
                        <Descriptions.Item label="Id" span={2}>
                            {auction.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At" span={2}>
                            {formatDateTime(auction.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated At" span={2}>
                            {formatDateTime(auction.updatedAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Jewelry" span={2}>
                            {auction.jewelry.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Starting Price" span={2}>
                            {auction.jewelry.staringPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="Current Price" span={2}>
                            {auction.currentPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Time" span={2}>
                            {formatDateTime(auction.startTime)}
                        </Descriptions.Item>
                        <Descriptions.Item label="End Time" span={2}>
                            {formatDateTime(auction.endTime)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={2}>
                            {auction.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="Step" span={2}>
                            {auction.step}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Bids" span={2}>
                            {auction.totalBids}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={2}>
                            {auction.status}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={12}>
                    <Descriptions title="Winner Details" bordered column={2}>
                        <Descriptions.Item label=" Id" span={2}>
                            {auction.winner.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name" span={2}>
                            {auction.winner.full_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address" span={2}>
                            {auction.winner.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth" span={2}>
                            {auction.winner.date_of_birth}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email" span={2}>
                            {auction.winner.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number" span={2}>
                            {auction.winner.phone_number}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role" span={2}>
                            {auction.winner.role_id.name}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        )}
    </Modal>
);

export default DetailAuctions;
