import React from "react";
import { Form, Input, Button, DatePicker, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dayjs from "dayjs";
import { useParams, useNavigate } from "react-router-dom";
import { addBlog } from "../../../../../services/api/BlogApi";

const BlogEdit = () => {
    const { id: postId } = useParams();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await addBlog(
                values.title,
                values.content,
                values.imageUrls.map((image) => image.url),
                values.images
            );
            console.log("Success:", response.data);
            navigate("/blogs");
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    const handleCancel = () => {
        navigate("/blogs");
    };
    const editorStyle = {
        height: "300px",
        marginBottom: "40px",
    };
    return (
        <div>
            <h2>Edit Blog {postId}</h2>
            <Form
                style={{ marginTop: "20px" }}
                name="edit_post"
                onFinish={onFinish}
                initialValues={{
                    id: postId,
                    title: `Post ${postId}`,
                    content: "This is the content",
                    createdAt: dayjs("2024-07-01T15:27:48.894Z"),
                    updatedAt: dayjs("2024-07-01T15:27:48.894Z"),
                    user: { fullName: "John Doe" },
                    blogImages: [{ id: 0, url: "http://example.com/image.jpg" }],
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="ID" name="id" rules={[{ required: true, message: "Please input the ID!" }]}>
                            <Input disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="User Full Name"
                            name={["user", "fullName"]}
                            rules={[{ required: true, message: "Please input the user full name!" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Created At"
                            name="createdAt"
                            rules={[{ required: true, message: "Please input the created at date!" }]}
                        >
                            <DatePicker showTime />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Updated At"
                            name="updatedAt"
                            rules={[{ required: true, message: "Please input the updated at date!" }]}
                        >
                            <DatePicker showTime />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Blog Images" name="blogImages">
                            <Upload
                                listType="picture"
                                action="/upload.do"
                                defaultFileList={[
                                    {
                                        uid: "1", // Set unique uid
                                        name: "example.png",
                                        status: "done",
                                        url: "http://example.com/image.jpg",
                                    },
                                ]}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please input the content!" }]}>
                    <ReactQuill style={editorStyle} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>{" "}
                    <Button type="default" onClick={handleCancel} style={{ marginLeft: "15px" }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BlogEdit;
