import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
  lang: {code:'en', label:'English'}
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    chooseLang: (state, action) => {
      state.lang = {...state.lang, ...action.payload}
    },
    signIn: (state, action) => {
      state.user = {...state.user, ...action.payload}
      state.isLoggedIn = true
    },
    signOut: (state) => {
      state.user = {};
      state.main = {};
      state.isLoggedIn = false
    }
  }
})

export const {signIn, signOut, chooseLang} = userSlice.actions
export default userSlice.reducer