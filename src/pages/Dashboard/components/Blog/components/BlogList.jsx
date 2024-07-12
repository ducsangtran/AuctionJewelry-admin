import React, { useEffect } from "react";
import { Table, Button, Image } from "antd"; // Import Image component from Ant Design
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../../../../core/store/slices/blogSlice";
import TotalBlog from "./TotalBlog";
import moment from "moment";

const BlogList = () => {
    const dispatch = useDispatch();
    const blogData = useSelector((state) => state.blog);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    useEffect(() => {
        console.log(blogData); // Debug log to check blogData
    }, [blogData]);

    const imageURL = (imageUrl) => {
        return imageUrl ? `http://apijewelryauction.techx.id.vn:8081/uploads/blogs/${imageUrl}` : null;
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => moment(text).format("YYYY-MM-DD HH:mm:ss"),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            render: (text, record) => <Link onClick={() => getLinkBlog(record.id)}>{text}</Link>,
        },
        { title: "User", dataIndex: ["user", "full_name"], key: "userName" }, // Access nested user.full_name

        {
            title: "Images",
            key: "images",
            render: (record) => {
                const url = imageURL(record.blogImages[0]?.url);
                return url ? <Image width={100} src={url} alt="Blog Image" preview={false} /> : <span>No images</span>;
            },
        },
    ];

    const handleAddBlog = () => {
        navigate("/blogs/add");
    };
    const getLinkBlog = (id) => {
        window.open(`http://jewelryauction.techx.id.vn:8081/blog/detail/${id}`);
    };
    // Check if blogs.data is an array before using it
    const dataSource = blogData.blogs?.data || []; // Access the data array

    return (
        <div>
            <Button type="primary" onClick={handleAddBlog} style={{ margin: 10 }}>
                Add Blog
            </Button>
            <div>
                <TotalBlog />
            </div>
            <Table columns={columns} dataSource={dataSource} loading={blogData.loading} pagination={{ pageSize: 3 }} />

            {blogData.error && <p style={{ color: "red" }}>{blogData.error}</p>}
        </div>
    );
};

export default BlogList;
