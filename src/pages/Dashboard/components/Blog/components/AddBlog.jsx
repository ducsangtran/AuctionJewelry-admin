// import React from "react";
// import { Form, Input, Button, Upload, Row, Col, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useNavigate } from "react-router-dom";
// import { addBlog } from "../../../../../services/api/BlogApi";

// const AddBlog = () => {
//     const navigate = useNavigate();

//     const getBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = (error) => reject(error);
//         });
//     };

//     const onFinish = async (values) => {
//         try {
//             const formData = new FormData();
//             if (values.title) {
//                 formData.append("title", values.title);
//                 console.log(values.title);
//             }
//             if (values.content) {
//                 formData.append("content", values.content);
//                 console.log(values.content);
//             }
//             if (values.images) {
//                 values.images.forEach((image) => {
//                     formData.append("images", image.originFileObj);
//                 });
//             }

//             // Map image files to their URLs
//             const imageUrls = await Promise.all(values.images.map((file) => getBase64(file.originFileObj)));
//             // Call API addBlog with image URLs
//             const response = await addBlog(formData);

//             console.log(imageUrls);

//             // console.log("Success:", response);
//             navigate("/blogs");
//         } catch (error) {
//             console.error("Error adding blog:", error);
//             message.error("Error adding blog");
//         }
//     };

//     const handleCancel = () => {
//         navigate("/blogs");
//     };

//     const editorStyle = {
//         height: "350px",
//         marginBottom: "40px",
//     };

//     return (
//         <div>
//             <h2>Add Blog</h2>
//             <Form
//                 style={{ marginTop: "20px" }}
//                 name="add_blog"
//                 onFinish={onFinish}
//                 initialValues={{
//                     title: "",
//                     content: "",
//                     images: [],
//                 }}
//             >
//                 <Row gutter={16}>
//                     <Col span={12}>
//                         <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
//                             <Input />
//                         </Form.Item>
//                     </Col>
//                 </Row>

//                 <Row gutter={16}>
//                     <Col span={12}>
//                         <Form.Item
//                             label="Blog Images"
//                             name="images"
//                             valuePropName="fileList"
//                             getValueFromEvent={(e) => e && e.fileList}
//                         >
//                             <Upload listType="picture" action="/upload.do" defaultFileList={[]}>
//                                 <Button icon={<UploadOutlined />}>Upload</Button>
//                             </Upload>
//                         </Form.Item>
//                     </Col>
//                 </Row>

//                 <Form.Item label="Content" name="content" rules={[{ required: true, message: "Please input the content!" }]}>
//                     <ReactQuill style={editorStyle} />
//                 </Form.Item>
//                 <Form.Item>
//                     <Button type="primary" htmlType="submit">
//                         Save
//                     </Button>
//                     <Button type="default" onClick={handleCancel} style={{ marginLeft: "15px" }}>
//                         Cancel
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default AddBlog;
import React from "react";
import { Form, Input, Button, Upload, Row, Col, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBlog } from "../../../../../core/store/slices/blogSlice";

const AddBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            if (values.title) {
                formData.append("title", values.title);
            }
            if (values.content) {
                formData.append("content", values.content);
            }
            if (values.images) {
                values.images.forEach((image) => {
                    formData.append("images", image.originFileObj);
                });
            }

            await dispatch(addBlog(formData));
            navigate("/blogs");
        } catch (error) {
            console.error("Error adding blog:", error);
            message.error("Error adding blog");
        }
    };

    const handleCancel = () => {
        navigate("/blogs");
    };

    const editorStyle = {
        height: "350px",
        marginBottom: "40px",
    };

    return (
        <div>
            <h2>Add Blog</h2>
            <Form
                style={{ marginTop: "20px" }}
                name="add_blog"
                onFinish={onFinish}
                initialValues={{
                    title: "",
                    content: "",
                    images: [],
                }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please input the title!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Blog Images"
                            name="images"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e && e.fileList}
                        >
                            <Upload listType="picture" action="/upload.do" defaultFileList={[]}>
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
                    </Button>
                    <Button type="default" onClick={handleCancel} style={{ marginLeft: "15px" }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddBlog;
