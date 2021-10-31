import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { loginUserString } from "../../../Redux/AuthState";
import store from "../../../Redux/store";
import Coupon from "../../Models/Coupon";
import notify from "../../Utils/Notify";
import "./DeleteCoupon.css";
import { Button } from "@material-ui/core";
function DeleteCoupon(): JSX.Element {
    const {couponId}=useParams<{couponId:string}>();
    const history= useHistory();
    const getCoupUrl="http://localhost:8080/company/getCoupon/"+couponId;
    const [couponData,setCouponData]=useState(new Coupon);

    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;

        axios.get(getCoupUrl,{headers:{"Authorization": `${token}`}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setCouponData(response.data);
        })
    },[]);

    const deleteCoupon=()=>{
        let token= store.getState().AuthState.loginUser.token;
        axios.post("http://localhost:8080/company/deleteCoupon/",couponData,{headers:{"Authorization": token}}).then((response)=>{
            console.log(couponData)
            store.dispatch(loginUserString(response.headers.authorization))
            notify.success("Deleted Customer Successfully!")
            console.log(response.data);})
            .catch(error=>{
                notify.error("Error deleting Customer")
                console.log(error);
            })
            }
    return (
        <div className="DeleteCoupon">
				<h1>ARE YOU SURE?</h1> <br />
            <Button variant="contained"  color="secondary" onClick={deleteCoupon}>Delete coupon</Button> <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
    );
}

export default DeleteCoupon;
