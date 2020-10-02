import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user:{},
        error:{}
    },
    reducers: {
        authRequestAttempt: (state, action) => {state = action.payload},
        authRequestSuccessful: (state, action) => {state.user = action.payload.user},
        authRequestFailure: (state, action) => {state.error = action.payload.error},

        accountCreationAttempt: (state,actions) =>{state = actions.payload},
        accountCreationSuccessful: (state,actions) =>{state.user = actions.payload},
        accountCreationFailure: (state,actions) =>{state.error = actions.error},

    }
})
export default authSlice;

