
//crudReducerFactory.js

import { createSlice } from "@reduxjs/toolkit"

class crudReducerFactory {
    constructor(slice, state) {

        const reducerResult = createSlice({
            name: slice,
            initialState: {
                isLoading:true,
                list: [],
                item: {}
            },
            reducers: this._generateReducers()
        });
        this.slice = slice
        this.reducer = reducerResult.reducer;
        this.actions = reducerResult.actions;
    }

    _generateReducers = () => {
        return {
            // get our list of items
            requestGetItems: (state, action) => {
                state.isLoading = true;
            },
            requestGetItemSuccess: (state, action) => {
                state.isLoading = false;
                state.item = action.payload.item;
            },
            requestGetItemsSuccess: (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            },
            requestGetItemsError: (state, action) => {
                state.isLoading = false;
            },
            requestStore: (state, action) => {
                state.isLoading = true;
                state = action.payload

            },
            storeSuccess: (state, action) => {
                state.isLoading = false;
                state[this.slice] = action.payload[this.slice]
            },
            storeFail: (state, action) => { 
                state.isLoading = false
                state.error = action.payload.error 
            },

            requestUpdate: (state, action) => {
                state.isLoading = true;
                state = action.payload
            },
            updateSuccess: (state, action) => {
                state.isLoading = false;
                state[this.slice] = action.payload[this.slice]
            },
            updateFail: (state, action) => { 
                state.isLoading = false;
                state.error = action.payload.error 
            },

            requestDelete: (state, action) => {
                state.isLoading = true;
                state = action.payload
            },
            deleteSuccess: (state, action) => {
                state.isLoading = false;
                state[this.slice] = action.payload[this.slice]
            },
            deleteFail: (state, action) => { 
                state.isLoading = false;
                state.error = action.payload.error 
            }

        }
    }
}

export default crudReducerFactory;
