import { configureStore } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync"
import { loadState } from "./localStorage"

const persistedState = loadState()

const usersSlice = createSlice({
  name: "users",
  initialState: persistedState?.users || [],
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
initStateWithPrevTab(store)

export { store }
