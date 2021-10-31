import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Customer from "../../Models/Customer";
import OneCustomer from "../OneCustomer/OneCustomer";
import "./getCustomer.css";
import { Button } from "@material-ui/core";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
import notify from "../../Utils/Notify";


interface GetCustomerProps {
	customerData:Customer;
}

function GetCustomer(props: GetCustomerProps): JSX.Element {
    const myUrl="http://localhost:8080/Admin/getSingleCustomer/"
    const [customerData,setData]=useState(new Customer);
    const {customerId}=useParams<{customerId:string}>();
    const history= useHistory();
    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;
        axios.get(myUrl+customerId,{headers:{"Authorization": `${token}`}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data)
            notify.success("Got Customer Successfully!");
}).catch(error=>{
    notify.error("Trouble getting Customer");
    console.log(error)
        })
    },[]);
    return (
        <form >
        <div className="AdminOneCompany">
        <OneCustomer
            id={customerData.id}
            email={customerData.email}
            firstName={customerData.firstName}
            lastName={customerData.lastName}
            password={customerData.password}
            />
            <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
        </form>
    );
}

export default GetCustomer;
