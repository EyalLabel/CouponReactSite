import { useHistory } from "react-router-dom";
import "./LogOutScreen.css";
import { Typography,TextField,ButtonGroup,Button } from "@material-ui/core";
import store from "../../Redux/store";
import { loginUserString, logoutUser } from "../../Redux/AuthState";
function LogOutScreen(): JSX.Element {
    const token= store.getState().AuthState.loginUser.token;
    const history= useHistory();

    const logOut=()=>{
       store.dispatch(logoutUser());
        history.push("/")
    }
    return (
        <div className="LogOutScreen">
			<h1>Would you like to log out?</h1>
            <br />
            <Button variant="contained"  color="secondary" onClick={logOut}>YES</Button>
        <Button variant="contained"  color="secondary" onClick={history.goBack}>NO</Button>
        </div>
    );
}

export default LogOutScreen;
