import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showModal: false
}


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal(state) {
            state.showModal = !state.showModal
        }
    }
})

export const {showModal} = modalSlice.actions
const modalReducer = modalSlice.reducer
export default modalReducer
