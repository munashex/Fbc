import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'   
import axios from 'axios'

const token = localStorage.getItem("token")

export const  getUser = createAsyncThunk('/user', async() => {
try {
const response = await axios.get('https://facebook-kt2g.onrender.com/user/currentUser', {headers: {
    "Content-Type": "application/json", 
    Authorization: `Bearer ${token}`
}})
return response.data.user
}catch(err) {
console.log(err)
}
})


const initialState = {
    loading: false, 
    error: false, 
    user: []
}

const userSlice = createSlice({
    name: 'user', 
    initialState, 
    reducers: {

    }, 
    extraReducers: (builder) => {
    builder 
    .addCase(getUser.pending, (state, action) => {
        state.loading = true
    })
    .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false   
        state.user = action.payload
    })
    .addCase(getUser.rejected, (state, action) => {
        state.loading = false 
        state.error = action.error
    })
    }
})

export default userSlice.reducer