import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { loginUserString } from "../../../Redux/AuthState";
import store from "../../../Redux/store";
import Company from "../../Models/Company";
import Coupon from "../../Models/Coupon";
import notify from "../../Utils/Notify";
import "./PurchasableCoupon.css";
import { Button } from "@material-ui/core";
import Customer from "../../Models/Customer";
interface PurchasableCouponProps {
    id:number,
    category:string,
    title:string,
    description:string,
    startDate:Date,
    endDate:Date,
    price:number,
    image:string,
    amount:number;
}

function PurchasableCoupon(props: PurchasableCouponProps): JSX.Element {
    const {couponId}=useParams<{couponId:string}>();
    const cusId=store.getState().AuthState.loginUser.userId;
    const[customerData,setCustomerData]=useState(new Customer);
    const history= useHistory();
    const getCoupUrl="http://localhost:8080/company/getCoupon/"+couponId;
    const getCustomerUrl="http://localhost:8080/Admin/getSingleCustomer/"+cusId;
    const [couponData,setCouponData]=useState(new Coupon);
    const purchaseUrl="http://localhost:8080/customer/purchaseCoupon/"+cusId;
    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;
axios.get(getCustomerUrl,{headers:{"Authorization": `${token}`}}).then((response)=>{
    store.dispatch(loginUserString(response.headers.authorization));
    setCustomerData(response.data);
})

        axios.get(getCoupUrl,{headers:{"Authorization": `${token}`}}).then((response)=>{
            store.dispatch(loginUserString(response.headers.authorization));
            setCouponData(response.data);
        })
    },[]);
    const buyCoupon=()=>{
        let token= store.getState().AuthState.loginUser.token;
        axios.post(purchaseUrl,couponData,{headers:{"Authorization": token}}).then((response)=>{
            console.log(couponData)
            store.dispatch(loginUserString(response.headers.authorization))
            notify.success("Coupon Purchased Successfully!")
            console.log(response.data);})
            .catch(error=>{
                notify.error("Error Buying Coupon")
                console.log(error);
            })
            }

    return (
        <div className="custombox">
        <br />
    {couponData.id} <br />
    {couponData.title}    <br />     
    {couponData.category} 
    <br />
    {couponData.description} <br />
   price:  {couponData.price}  amount:  {couponData.amount} <br />
 valid from:  {couponData.startDate} until: 
    {couponData.endDate} <br />
    <img className="photo" src={couponData.image}  /><br /> <br />

    <Button variant="contained"  color="secondary" onClick={buyCoupon}>BUY ME</Button> <br /> <br />
    <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>

    </div>
    
    );
}

export default PurchasableCoupon;
