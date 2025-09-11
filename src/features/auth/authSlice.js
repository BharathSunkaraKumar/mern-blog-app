import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authServer from './authServer'

// const api = 'http://localhost:8000/api/auth'

const userFromStoreage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

const initialState = {
    user: userFromStoreage,
    loading: false,
    error: null
}

export const registerUser = createAsyncThunk('auth/register', async(userData, thunkApi) => {
    try {
        return await authServer.register(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)   
    }
})


export const loginUser = createAsyncThunk('auth/login', async(userData, thunkApi) => {
    try {
        return await authServer.login(userData)
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)   
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false,
            state.error = null
        },
        logout: (state) => {
            state.user = null
            authServer.logout()
        }
    },
    extraReducers: (builder) => {
        builder

        //rigister

         .addCase(registerUser.pending, (state) => {
            state.loading = true
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
         })
         
         //login

         .addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        })
    }
})

export const {reset, logout} = authSlice.actions;
export default authSlice.reducer
 
