import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const Api_Url = 'http://localhost:8000/api/posts'

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async() => {
    const res = await axios.get(Api_Url)
    return res.data
})

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData, {getSate}) => {
        const token = getSate().auth.user?.token
        const res = await axios.post(Api_Url, postData, {
            headers: {authorization: `Bearer ${token}`}
        })
        return res.data
    }
)

export const fetchPostById = createAsyncThunk("posts/fetchPostById", async(id) => {
    const res = await axios.get(`${Api_Url}/${id}`)
    return res.data
})

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
            });
    }
})

export default postSlice.reducer