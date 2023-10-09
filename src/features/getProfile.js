import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'   
import axios from 'axios'
 
let token  = localStorage.getItem('token')

export const  getProfile = createAsyncThunk("/profile", async() => {
    try {
    const response = await axios.get('https://facebook-kt2g.onrender.com/user/profile', {headers: {
     "Content-Type": "application/json", 
     Authorization: `Bearer ${token}`
    }})
    return response.data
    }catch(err) {
     console.log(err)
    }
})

const initialState = {
loading: false, 
error: '', 
profile: []
}

const ProfileReducer = createSlice({
    name: 'profile', 
    initialState, 
    reducers: {}, 
    extraReducers: (builder) => {
    builder 
    .addCase(getProfile.pending, (state, action) => {
        state.loading = true
    })
    .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = true 
        state.profile = action.payload
    })
    .addCase(getProfile.rejected, (state, action) => {
        state.loading = false 
        state.error = action.error
    })
    }
})

export default ProfileReducer.reducer