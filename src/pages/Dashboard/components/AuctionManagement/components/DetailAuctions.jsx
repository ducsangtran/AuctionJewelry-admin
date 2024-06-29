import React from "react";
import { Badge, Col, Descriptions, Modal, Row } from "antd";
import moment from "moment";

const formatDateTime = (dateTime) => moment(dateTime).format("YY-MM-DD HH:mm");

const DetailAuctions = ({ visible, onCancel, auction }) => (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={1500}>
        {auction && (
            <Row gutter={16}>
                <Col span={12}>
                    <Descriptions title="Auctions Details" bordered column={2}>
                        <Descriptions.Item label="Id" span={2}>
                            {auction.id ? auction.id : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At" span={2}>
                            {formatDateTime(auction.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated At" span={2}>
                            {formatDateTime(auction.updatedAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Jewelry" span={2}>
                            {auction.jewelry ? auction.jewelry.name : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Starting Price" span={2}>
                            {auction.jewelry ? auction.jewelry.staringPrice : "N/A"}
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
                    </Descriptions>
                </Col>
                <Col span={12}>
                    <Descriptions title="Winner Details" bordered column={2}>
                        <Descriptions.Item label=" Id" span={2}>
                            {auction.winner ? auction.winner.id : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name" span={2}>
                            {auction.winner ? auction.winner.full_name : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address" span={2}>
                            {auction.winner ? auction.winner.address : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth" span={2}>
                            {auction.winner ? auction.winner.date_of_birth : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email" span={2}>
                            {auction.winner ? auction.winner.email : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number" span={2}>
                            {auction.winner ? auction.winner.phone_number : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role" span={2}>
                            {auction.winner && auction.winner.role_id ? auction.winner.role_id.name : "N/A"}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        )}
    </Modal>
);

export default DetailAuctions;
