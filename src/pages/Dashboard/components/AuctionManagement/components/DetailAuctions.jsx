import React from "react";
import { Badge, Descriptions, Modal } from "antd";

const DetailAuctions = ({ open, onCancel, auction }) => (
    <Modal open={open} onCancel={onCancel} footer={null} width={1800}>
        {auction && (
            <Descriptions title="Auctions Details" bordered column={10}>
                <Descriptions.Item label="Id" span={2}>
                    {auction.id}
                </Descriptions.Item>
                <Descriptions.Item label="Created At" span={2}>
                    {auction.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At" span={2}>
                    {auction.updatedAt}
                </Descriptions.Item>
                <Descriptions.Item label="Current Price" span={2}>
                    {auction.currentPrice}
                </Descriptions.Item>
                <Descriptions.Item label="Start Time" span={2}>
                    {auction.startTime}
                </Descriptions.Item>
                <Descriptions.Item label="End Time" span={2}>
                    {auction.endTime}
                </Descriptions.Item>
                <Descriptions.Item label="Step" span={2}>
                    {auction.step}
                </Descriptions.Item>
                <Descriptions.Item label="Total Bids" span={2}>
                    {auction.totalBids}
                </Descriptions.Item>
                <Descriptions.Item label="Auction Status" span={4}>
                    {auction.status}
                </Descriptions.Item>
                <Descriptions.Item label="Jewelry Id" span={2}>
                    {auction.jewelry.id}
                </Descriptions.Item>
                <Descriptions.Item label="Created At" span={2}>
                    {auction.jewelry.createdAt}
                </Descriptions.Item>

                <Descriptions.Item label="Description" span={2}>
                    {auction.jewelry.description}
                </Descriptions.Item>
                <Descriptions.Item label="Color" span={2}>
                    {auction.jewelry.color}
                </Descriptions.Item>
                <Descriptions.Item label="Sex" span={2}>
                    {auction.jewelry.sex}
                </Descriptions.Item>
                <Descriptions.Item label="Size" span={2}>
                    {auction.jewelry.size}
                </Descriptions.Item>
                <Descriptions.Item label="Starting Price" span={2}>
                    {auction.jewelry.staringPrice}
                </Descriptions.Item>
                <Descriptions.Item label="Jewelry Status" span={2}>
                    {auction.jewelry.status}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                    {auction.jewelry.status}
                </Descriptions.Item>
                <Descriptions.Item label="Jewelry Weight" span={2}>
                    {auction.jewelry.weight}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Status" span={2}>
                    <Badge status="processing" text="Running" />
                </Descriptions.Item> */}
                <Descriptions.Item label="Brand Id" span={2}>
                    {auction.jewelry.brand.id}
                </Descriptions.Item>
                <Descriptions.Item label="Brand" span={2}>
                    {auction.jewelry.brand.name}
                </Descriptions.Item>
                <Descriptions.Item label="Created At" span={2}>
                    {auction.jewelry.brand.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At" span={4}>
                    {auction.jewelry.brand.updatedAt}
                </Descriptions.Item>
                <Descriptions.Item label="Category Id" span={2}>
                    {auction.jewelry.category.id}
                </Descriptions.Item>
                <Descriptions.Item label="Category " span={2}>
                    {auction.jewelry.category.name}
                </Descriptions.Item>
                <Descriptions.Item label="Created At" span={2}>
                    {auction.jewelry.category.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At" span={4}>
                    {auction.jewelry.category.updatedAt}
                </Descriptions.Item>
                <Descriptions.Item label="Collection Id" span={2}>
                    {auction.jewelry.collection.id}
                </Descriptions.Item>
                <Descriptions.Item label="Collection " span={2}>
                    {auction.jewelry.collection.name}
                </Descriptions.Item>
                <Descriptions.Item label="Created At" span={2}>
                    {auction.jewelry.collection.createdAt}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At" span={4}>
                    {auction.jewelry.collection.updatedAt}
                </Descriptions.Item>

                <Descriptions.Item label="JewelryMaterial Id" span={2}>
                    {auction.jewelry.jewelryMaterials[0].id}
                </Descriptions.Item>

                <Descriptions.Item label="JewelryMaterial Weight" span={2}>
                    {auction.jewelry.jewelryMaterials[0].weight}
                </Descriptions.Item>
                <Descriptions.Item label="Material Id" span={2}>
                    {auction.jewelry.jewelryMaterials[0].material.id}
                </Descriptions.Item>
                <Descriptions.Item label="Material" span={4}>
                    {auction.jewelry.jewelryMaterials[0].material.name}
                </Descriptions.Item>
                <Descriptions.Item label="Seller Id " span={2}>
                    {auction.jewelry.sellerId.id}
                </Descriptions.Item>
                <Descriptions.Item label="Seller" span={2}>
                    {auction.jewelry.sellerId.full_name}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                    {auction.jewelry.sellerId.address}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth " span={2}>
                    {auction.jewelry.sellerId.date_of_birth}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={2}>
                    {auction.jewelry.sellerId.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number" span={2}>
                    {auction.jewelry.sellerId.phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="Role" span={2}>
                    {auction.jewelry.sellerId.role_id.name}
                </Descriptions.Item>
            </Descriptions>
        )}
    </Modal>
);

export default DetailAuctions;
