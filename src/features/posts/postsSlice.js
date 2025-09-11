import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const Api_Url = 'https://myblog-r8m3.onrender.com/api/posts'

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async() => {
    const res = await axios.get(Api_Url)
    return res.data
})

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData, {getState}) => {
        const token = getState().auth.user?.token
        const res = await axios.post(Api_Url, postData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return res.data
    }
)

export const fetchPostById = createAsyncThunk("posts/fetchPostById", async(id) => {
    const res = await axios.get(`${Api_Url}/${id}`)
    return res.data
})


export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async({id, postData} , {getState}) => {
        const token = getState().auth.user?.token;
        const res = await axios.put(
            `${Api_Url}/${id}`,
            postData,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return res.data
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async(id, {getState}) => {
        const token = getState().auth.user?.token;
        await axios.delete(
            `${Api_Url}/${id}`,
            {
                headers: {authorization: `Bearer ${token}`}
            }
        ) 
        return id;
    }
)

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        singlePost: null,
        loading: false,
        error:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })

            .addCase(fetchPostById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.singlePost = action.payload; 
            })
            .addCase(fetchPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((p) => p._id === action.payload._id ? action.payload : p)
                state.singlePost = action.payload
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter((p) => p._id !== action.payload);
                state.singlePost = null;
            });
    }
})

export default postSlice.reducer