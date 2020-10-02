import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        email: '',
        password: '',
        user:{}
    },
    reducers: {
        storeAttempt: (state, action) => {state = action.payload},
        storeSuccessful: (state, action) => {state.user = action.payload.user},
        storeFailure: (state, action) => {state.error = action.payload.error},

        updateAttempt: (state, action) => {state = action.payload},
        updateSuccessful: (state, action) => {state.user = action.payload.user},
        updateFailure: (state, action) => {state.error = action.payload.error},

        deleteAttempt: (state, action) => {state = action.payload},
        deleteSuccessful: (state, action) => {state.user = action.payload.user},
        storeFailure: (state, action) => {state.error = action.payload.error}
    }
})
export default userSlice;

