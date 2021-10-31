import axios from "axios";
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import Company from "../../Models/Company";
import OneCompany from "../OneCompany/OneCompany";
import "./AdminGetCompanies.css";
import { Typography,TextField,ButtonGroup,Button } from "@material-ui/core";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
import notify from "../../Utils/Notify";

interface AdminGetCompaniesState{
    companyData:Company[]
}
function AdminGetCompanies(): JSX.Element {
    const history= useHistory();
    const [companyData,setData]=useState([]);
    const myUrl="http://localhost:8080/Admin/getAllCompanyToken";
    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;  
    axios.get(myUrl,{headers:{"Authorization": `${token}`}})
    .then(response=>{
    setData(response.data)
    console.log(response.headers);
    store.dispatch(loginUserString(response.headers.authorization));
    notify.success("Got Companies")
    }
    )
    .catch(error=>{
        notify.error("Failed to get companies")
        console.log(error.response);
        console.log(error.message);
    })
},[]);
    const goBack=()=>{
        history.push("admin");
    }

    return (
        <div className="Main">
			{companyData.map(item=><OneCompany
            key={item.id}
            id={item.id}
            email={item.email}
            name={item.name}
            password={item.password}
            />)}
            <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
    );
}

export default AdminGetCompanies;
