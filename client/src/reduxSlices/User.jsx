import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signUserOut(state) {
            state.currentUser = null;
            state.error = null;
            state.loading = false;
        },
    }
})





export const {setCurrentUser, signUserOut} = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;

