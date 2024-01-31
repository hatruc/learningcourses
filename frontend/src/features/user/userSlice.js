import { createSelector, createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: "",
    email: "",
    fullname: "",
    address: "",
    phone: "",
    avatar: "",
    id: "",
    role: "",
    access_token: "",
    refresh_token: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        updateUser: (state, action) => {
            const {
                username = "",
                email = "",
                fullname = "",
                address = "",
                phone = "",
                avatar = "",
                id = "",
                role = "",
                access_token = "",
                refresh_token = "",
            } = action.payload;
            console.log(action.payload);
            state.id = id ? id : state.id;
            state.username = username ? username : state.username;
            state.fullname = fullname ? fullname : state.fullname;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.role = role ? role : state.role;
            state.access_token = access_token ? access_token : state.access_token;
            state.refresh_token = refresh_token ? refresh_token : state.refresh_token;
        },

        logout: (state) => {
            state.username = ""
            state.email = ""
            state.fullname = ""
            state.address = ""
            state.phone = ""
            state.avatar = ""
            state.id = ""
            state.role = ""
            state.access_token = ""
            state.refresh_token = ""
        }

    },
})

export const userSelector = createSelector(
    [(state) => {
        return state.user
    }],
    (user) => user
);

// Action creators are generated for each case reducer function
export const { updateUser, logout } = userSlice.actions

export default userSlice.reducer