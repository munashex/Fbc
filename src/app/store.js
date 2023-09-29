import {configureStore} from '@reduxjs/toolkit' 
import UserReducer from '../features/getUser' 
import ProfileReducer from '../features/getProfile' 


const store = configureStore({
    reducer: {
      user: UserReducer, 
      profile: ProfileReducer
    }
}) 

export default store