import axios from "axios";
import { useState } from "react";
import "./LoginUpgraded.css";
import UserDetails from "./UserDetails";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import { AccountBox} from "@material-ui/icons";
import LockIcon from '@mui/icons-material/Lock';
import Checkbox from '@material-ui/core/Checkbox';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { useForm } from "react-hook-form";
import Notify from "../Utils/Notify";
import notify from "../Utils/Notify";
import { useHistory } from "react-router";
import globals from "../../Services/Globals";
import jwtAxios from "../Utils/JWTaxios";
import store from "../../Redux/store";
import { loginUserString } from "../../Redux/AuthState";


function LoginUpgraded(): JSX.Element {
const history=useHistory();
    const {register, handleSubmit, setError, formState:{errors}} = useForm<UserDetails>(
        {defaultValues:{
            userId:"",
        userName:"",
        userPassword:"",
        clientType:" "
        
    }});
   
    //const [jwtToken,setToken] = useState("User has no token, bad bad user !!!");

     function send(userDetails:UserDetails){
        console.log("data arrived")
        console.log(userDetails.userName); 
        axios.post("http://localhost:8080/Login/login",userDetails)
        .then(response=>{
            var myToken = response.data.toString();
            console.log("look mom, i got a token:");
            console.log(myToken);
            store.dispatch(loginUserString(myToken));
            notify.success("Login Successful!");
            switch(userDetails.clientType){
                case("ADMINISTRATOR"):history.push("/admin");
                break;
                case("COMPANY"):history.push("/company");
                break;
                case("CUSTOMER"):history.push("/customer");
                break;
            }
        console.log(response.data);})
        
        .catch(error=>{
            notify.error("Trouble logging in");
            console.log(error)
        });
    }
    return (
        <div className="Main">
        <form onSubmit={handleSubmit(send)}>
       <Typography variant="h4" className="HeadLine">Login</Typography> <br />
       <AccountBox style={{fontSize:40,margin:10}}></AccountBox>
       <TextField label="user" variant="outlined"  color="secondary" focused {...register("userName")}
                        
></TextField> <br />  <br /> 
       <LockIcon style={{fontSize:40,margin:10}}></LockIcon>
       <TextField label="password" variant="outlined" type="password" focused {...register("userPassword")}
                        ></TextField> <br /> 
                    <AccessibilityNewIcon style={{fontSize:40, margin:10}}/>
                    <InputLabel htmlFor="select">client Type</InputLabel>
                <NativeSelect id="select" {...register("clientType")} >
                    <option value="ADMINISTRATOR">Administrator</option>
                    <option value="COMPANY">Company</option>
                    <option value="CUSTOMER">Customer</option>
                </NativeSelect>
                    <br/><br/>

       <Checkbox/>
       <label> Remmember me</label>
       <br />
       <ButtonGroup variant="contained" >
           <Button color="primary" type="submit">Send</Button>
       </ButtonGroup>
       </form>
   </div>
);
}


export default LoginUpgraded;
