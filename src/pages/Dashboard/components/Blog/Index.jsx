import { Outlet } from "react-router-dom";

export const Blog = () => {
    return (
        <div>
            <h1>Blog</h1>
            <Outlet />
        </div>
    );
};
