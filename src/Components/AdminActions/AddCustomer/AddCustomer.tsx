import { useForm } from "react-hook-form";
import Customer from "../../Models/Customer";
import "./AddCustomer.css";
import axios from "axios";
import { useState } from "react";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import { AccountBox} from "@material-ui/icons";
import LockIcon from '@mui/icons-material/Lock';
import Checkbox from '@material-ui/core/Checkbox';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { useHistory } from "react-router-dom";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
import notify from "../../Utils/Notify";

function AddCustomer(): JSX.Element {
    const {register, handleSubmit,setError, formState: { errors }} = useForm<Customer>({
        defaultValues:{
            email:"",
            password:"",
            firstName:"",
            lastName:""
        }
    });
    const history=useHistory();
    function send(customer:Customer){
        let token= store.getState().AuthState.loginUser.token;
       console.log("data arrived")
       console.log(customer.lastName); 
   axios.post("http://localhost:8080/Admin/addCustomer",customer,{headers:{"Authorization": token}})
   .then((response)=>{
    store.dispatch(loginUserString(response.headers.authorization))
    notify.success("Customer Added Successfully!")
       console.log(response.data);})
       .catch(error=>{
        notify.error("Trouble Adding Customer");
        console.log(error);
    })
    
       }
    return (
        
			<div className="Main">
        <form onSubmit={handleSubmit(send)}>
       <Typography variant="h4" className="HeadLine">Add Customer</Typography> <br />
       <AccountBox style={{fontSize:40,margin:10}}></AccountBox>
     <TextField label="Email" variant="outlined"  color="secondary" name="email" type="email" focused {...register ("email")}></TextField> <br /> 
       <LockIcon style={{fontSize:40,margin:10}}></LockIcon>
       <TextField label="password" variant="outlined" type="password" focused
                        {...register("password")
}></TextField> <br /> 

                    <AccessibilityNewIcon style={{fontSize:40, margin:10}}/>
                    <TextField label="First Name" variant="outlined" focused
                        {...register("firstName")
}></TextField>
<br /> <br />
    <TextField label="Last Name" variant="outlined" focused
                        {...register("lastName")
}></TextField>
                    <br/>
       <br />
       <ButtonGroup variant="contained" >
           <Button color="primary" type="submit" onClick={history.goBack}>Send</Button>
           <Button color="primary"  onClick={history.goBack}>Menu</Button>
       </ButtonGroup>
       </form >
        </div>
    );
}

export default AddCustomer;
