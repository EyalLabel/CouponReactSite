
import axios from "axios";
import { loginUser, loginUserString } from "../../Redux/AuthState";
import store from "../../Redux/store";


const jwtAxios=axios.create();

jwtAxios.interceptors.request.use(request => {
  console.log(store.getState().AuthState.loginUser.token);
  request.headers = {
      "Authorization": store.getState().AuthState.loginUser.token
  }
  return request;
});


jwtAxios.interceptors.response.use(response => {

store.getState().AuthState.loginUser.token=response.headers.Authorization;
store.dispatch(loginUserString(response.headers.Authorization))

  return response;
});

export default jwtAxios;


