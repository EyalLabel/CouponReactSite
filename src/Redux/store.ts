import { combineReducers, createStore } from "redux";
import { authReducer, AuthState } from "./AuthState";

const reducers=combineReducers({
    AuthState:authReducer
})

const store= createStore(reducers);

export default store;