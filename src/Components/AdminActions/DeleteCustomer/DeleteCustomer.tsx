import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loginUserString } from "../../../Redux/AuthState";
import store from "../../../Redux/store";
import Customer from "../../Models/Customer";
import notify from "../../Utils/Notify";
import "./DeleteCustomer.css";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import { useHistory } from "react-router-dom";
function DeleteCustomer(): JSX.Element {
    
    const [customerData,setCusData]=useState(new Customer);
    const {customerId}=useParams<{customerId:string}>();
    const customerUrl="http://localhost:8080/Admin/getSingleCustomer/"+customerId;
    const token= store.getState().AuthState.loginUser.token;
    const history= useHistory();
    useEffect(()=>{
        
        axios.get(customerUrl,{headers:{"Authorization": `${token}`}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setCusData(response.data)
            notify.success("Got Customer Successfully!");
}).catch(error=>{
    notify.error("Trouble getting Customer");
    console.log(error)
        })
    },[])

    const deleteCustomer=()=>{
        axios.post("http://localhost:8080/Admin/deleteCustomer/",customerData,{headers:{"Authorization": token}}).then((response)=>{
                   store.dispatch(loginUserString(response.headers.authorization))
                   notify.success("Deleted Customer Successfully!")
                   console.log(response.data);})
                   .catch(error=>{
                       notify.error("Error deleting Customer")
                       console.log(error);
                   })
                };
    return (
        <div className="DeleteCustomer">
			<h1>ARE YOU SURE?</h1>
            <Button variant="contained"  color="secondary" onClick={deleteCustomer}>Delete customer</Button> <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
    );
}

export default DeleteCustomer;
