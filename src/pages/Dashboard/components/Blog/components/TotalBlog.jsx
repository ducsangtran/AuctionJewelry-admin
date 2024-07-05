import React from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";

const TotalBlog = () => {
    const blogData = useSelector((state) => state.blog);

    const blogCount = blogData.blogs && blogData.blogs.data ? blogData.blogs.data.length : 0;

    return (
        <Card title="">
            <p>Total blogs: {blogCount}</p>
        </Card>
    );
};

export default TotalBlog;
