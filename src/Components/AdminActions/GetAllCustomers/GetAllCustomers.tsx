import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Customer from "../../Models/Customer";
import OneCustomer from "../OneCustomer/OneCustomer";
import { Button } from "@material-ui/core";
import "./GetAllCustomers.css";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
interface AdminGetCustomersState{
    customersData:Customer[]
}
function GetAllCustomers(): JSX.Element {

    const history= useHistory();
    const [customersData,setData]=useState([]);
    const myUrl="http://localhost:8080/Admin/getAllCustomers/";
    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;
axios.get(myUrl,{headers:{"Authorization": `${token}`}})
.then(response=>{
    setData(response.data)
    store.dispatch(loginUserString(response.headers.authorization));
    })},[]);

    return (
        <div className="GetAllCustomers">
				{customersData.map(item=><OneCustomer
            key={item.id}
            id={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            email={item.email}
            password={item.password}
            />)}
            <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
    );
}

export default GetAllCustomers;
