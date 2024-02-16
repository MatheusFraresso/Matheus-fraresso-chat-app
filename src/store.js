import { configureStore } from "@reduxjs/toolkit"

import { createSlice } from "@reduxjs/toolkit"

import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync"

export const usersSlice = createSlice({
  name: "users",
  initialState: [
    { name: "Matheus", messages: [] },
    { name: "jhon", messages: [] },
    { name: "paul", messages: [] },
  ],
  reducers: {
    addUser: (state, action) => {
      let userAlreadyExistis = state.find(
        (user) => user.name === action.payload.name
      )
      if (!userAlreadyExistis) state.push(action.payload)
      else alert("usuário já existe")
    },
    createMessage: (state, action) => {
      let userIndex = state.findIndex(
        (user) => user.name === action.payload.sender.name
      )
      state[userIndex].messages.push(action.payload)
    },
  },
})
export const { addUser, createMessage } = usersSlice.actions

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createStateSyncMiddleware({})),
})
initMessageListener(store)

export { store }
