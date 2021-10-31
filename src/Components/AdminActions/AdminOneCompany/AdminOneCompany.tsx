import axios from "axios";
import { Typography,TextField,ButtonGroup,Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";

import "./AdminOneCompany.css";
import Company from "../../Models/Company";
import OneCompany from "../OneCompany/OneCompany";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
interface companyProps{
    companyData:Company;
}


function AdminOneCompany(props:companyProps): JSX.Element {
    const myUrl="http://localhost:8080/Admin/getOneCompany/"
const [companyData,setData]=useState(new Company);
const {companyId}=useParams<{companyId:string}>();

const history= useHistory();
useEffect(()=>{
    let token= store.getState().AuthState.loginUser.token;
    axios.get(myUrl+companyId,{headers:{"Authorization": `${token}`}}).then((response)=>{
        setData(response.data)
        store.dispatch(loginUserString(response.headers.authorization));
    })
},[]);

    return (
        <form >
        <div className="AdminOneCompany">
        <OneCompany
            id={companyData.id}
            email={companyData.email}
            name={companyData.name}
            password={companyData.password}
            />
            <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
        </form>
    );
}

export default AdminOneCompany;
