import React from "react";
import { Descriptions, Modal, Row, Col } from "antd";
import moment from "moment";

const formatDateTime = (dateTime) => {
    return moment(dateTime).isValid() ? moment(dateTime).format("YY-MM-DD HH:mm") : "Invalid Date";
};

const JewelryDetails = ({ visible, onCancel, jewelry }) => (
    <Modal open={visible} onCancel={onCancel} footer={null} width={1500}>
        {jewelry && (
            <Row gutter={16}>
                <Col span={12}>
                    <Descriptions title="Jewelry Details" bordered column={4}>
                        <Descriptions.Item label="Id" span={2}>
                            {jewelry.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Name" span={2}>
                            {jewelry.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At" span={2}>
                            {formatDateTime(jewelry.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Updated At" span={2}>
                            {formatDateTime(jewelry.updatedAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Color" span={2}>
                            {jewelry.color}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description" span={2}>
                            {jewelry.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Jewelry Condition" span={2}>
                            {jewelry.jewelryCondition}
                        </Descriptions.Item>
                        <Descriptions.Item label="Sex" span={2}>
                            {jewelry.sex}
                        </Descriptions.Item>
                        <Descriptions.Item label="Starting Price" span={2}>
                            {jewelry.staringPrice}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status " span={2}>
                            {jewelry.status}
                        </Descriptions.Item>
                        <Descriptions.Item label="Weight" span={2}>
                            {jewelry.weight}
                        </Descriptions.Item>
                        <Descriptions.Item label="Brand" span={2}>
                            {jewelry.brand.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Category" span={2}>
                            {jewelry.category.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Collection" span={2}>
                            {jewelry.collection.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Material" span={2}>
                            {jewelry.jewelryMaterials[0]?.material.name}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={12}>
                    <Descriptions title="Seller Details" bordered column={2}>
                        <Descriptions.Item label="Name" span={2}>
                            {jewelry.sellerId.full_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Address" span={2}>
                            {jewelry.sellerId.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date Of Birth" span={2}>
                            {jewelry.sellerId.date_of_birth}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email" span={2}>
                            {jewelry.sellerId.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number" span={2}>
                            {jewelry.sellerId.phone_number}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role" span={2}>
                            {jewelry.sellerId.role_id.name}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        )}
    </Modal>
);

export default JewelryDetails;
