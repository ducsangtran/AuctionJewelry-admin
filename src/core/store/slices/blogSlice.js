import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axios";

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
    const response = await api.get("blog/all");
    return response.data;
});
export const addBlog = createAsyncThunk("blog/addBlog", async (formData, thunkAPI) => {
    const response = await api.post("blog", formData);
    // Fetch the updated blog list after adding a new blog
    thunkAPI.dispatch(fetchBlogs());
    return response.data;
});
const blogSlice = createSlice({
    name: "blog",
    initialState: {
        blogs: [],
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
                state.error = "";
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.blogs = [];
                state.error = action.error.message;
            })
            .addCase(addBlog.fulfilled, (state, action) => {
                state.blogs.push(action.payload);
            });
    },
});

export default blogSlice.reducer;
