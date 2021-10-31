import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { loginUserString } from "../../../Redux/AuthState";
import store from "../../../Redux/store";
import "./DeleteCompany.css";
import { Button } from "@material-ui/core";
import Coupon from "../../Models/Coupon";
import Company from "../../Models/Company";
import notify from "../../Utils/Notify";
function DeleteCoupon(): JSX.Element {
    const {companyId}=useParams<{companyId:string}>();
    const history= useHistory();
    const companyUrl="http://localhost:8080/Admin/getOneCompany/"+companyId
    const [companyData,setData]=useState(new Company);
    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;

        axios.get(companyUrl,{headers:{"Authorization": `${token}`}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setData(response.data);
        })
    },[]);
    const deleteCompany=()=>{
        let token= store.getState().AuthState.loginUser.token;
        axios.post("http://localhost:8080/Admin/deleteCompany/",companyData,{headers:{"Authorization": token}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization))
            notify.success("Deleted Company Successfully!")
            console.log(response.data);})
            .catch(error=>{
                notify.error("Error deleting company")
                console.log(error);
            })
            }
    return (
        <div className="DeleteCompany">
			<h1>ARE YOU SURE?</h1> <br />
            <Button variant="contained"  color="secondary" onClick={deleteCompany}>Delete company</Button> <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
    );
}

export default DeleteCoupon;
