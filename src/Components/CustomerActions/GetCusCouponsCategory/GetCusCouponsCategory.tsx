import "./GetCusCouponsCategory.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Coupon from "../../Models/Coupon";

import { Typography,TextField,ButtonGroup,Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
import Company from "../../Models/Company";
import OneCoupon from "../../CompanyActions/OneCoupon/OneCoupon";
import notify from "../../Utils/Notify";
interface GetAllCouponsState{
    couponData:Coupon[];
}
function GetCusCouponsCategory(): JSX.Element {
    const history= useHistory();
    const cusId=store.getState().AuthState.loginUser.userId;
    const [couponData,setData]=useState([]);
    const {category}=useParams<{category:string}>();
    const myUrl="http://localhost:8080/customer/getCustomerCouponsByCategory/"+category+"/"+cusId;
    
    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;
axios.get(myUrl,{headers:{"Authorization": `${token}`}})
.then(response=>{
    console.log(cusId)
    setData(response.data)
    store.dispatch(loginUserString(response.headers.authorization));
    notify.success("Got Coupons Successfully!");
}).catch(error=>{
    notify.error("Trouble getting coupons");
    console.log(error)
    })},[]);
    return (
        <div className="Main">
        {couponData.map(item=><OneCoupon
        key={item.id}
        id={item.id}
        category={item.category}
        title={item.title}
        description={item.description}
        price={item.price}
        startDate={item.startDate}
        endDate={item.endDate}
        image={item.image}
        amount={item.amount}
        />)}
        <br /> <br />
        <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
    </div>
    );
}

export default GetCusCouponsCategory;
