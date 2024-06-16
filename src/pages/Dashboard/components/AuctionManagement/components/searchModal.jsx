import React, { useState } from "react";
import { Modal, Form, Input, InputNumber, Select, Switch, Button } from "antd";

const { Option } = Select;

const SearchModal = ({ visible, onCancel, onSearch }) => {
    const [form] = Form.useForm();

    const handleSearch = () => {
        form.validateFields()
            .then((values) => {
                onSearch(values);
                setTimeout(() => {
                    form.resetFields();
                }, 0); // Hoặc có thể thay đổi thời gian delay tùy theo trường hợp cụ thể
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            title="Search Auction"
            visible={visible}
            onOk={handleSearch}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="search" type="primary" onClick={handleSearch}>
                    Search
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="collectionId" label="Collection ID">
                    <Input />
                </Form.Item>
                <Form.Item name="categoryId" label="Category ID">
                    <Input />
                </Form.Item>
                <Form.Item name="minPrice" label="Min Price">
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="maxPrice" label="Max Price">
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item name="brandId" label="Brand ID">
                    <Input />
                </Form.Item>
                <Form.Item name="jewelryCondition" label="Jewelry Condition">
                    <Select>
                        <Option value="New">Brand New</Option>
                        <Option value="Used">Used</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="status" label="Status">
                    <Select>
                        <Option value="Waiting">Waiting</Option>
                        <Option value="InProgress">InProgress</Option>
                        <Option value="Completed">Completed</Option>
                        <Option value="Cancel">Cancel</Option>
                        <Option value="Fail">Fail</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="sex" label="Sex">
                    <Select>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Unisex">Unisex</Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SearchModal;
