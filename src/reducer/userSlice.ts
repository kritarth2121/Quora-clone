import {createSlice} from "@reduxjs/toolkit";
import {AppState} from ".";

export interface User {
    displayName: string;
    email: string;
    photo: string;
    uid: string;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    } as {user: User | null},
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const {login, logout} = userSlice.actions;

export const selectUser = (state: AppState) => state.user?.user;

export default userSlice.reducer;
