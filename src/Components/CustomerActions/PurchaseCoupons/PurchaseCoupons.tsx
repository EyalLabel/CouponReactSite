import Coupon from "../../Models/Coupon";
import "./PurchaseCoupons.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
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
function PurchaseCoupons(): JSX.Element {
    const history= useHistory();
    const cusId=store.getState().AuthState.loginUser.userId;
    const [couponData,setData]=useState([]);
    const [couponId,setId]=useState("");
    const url="http://localhost:8080/Admin/getAllCoupons/";

    useEffect(()=>{
        let token= store.getState().AuthState.loginUser.token;
axios.get(url,{headers:{"Authorization": `${token}`}})
.then(response=>{
    setData(response.data)
    store.dispatch(loginUserString(response.headers.authorization));
    notify.success("Got Coupons Successfully!");
    }).catch(error=>{
        notify.error("Trouble getting coupons");
        console.log(error)
        })
},[]);
const buyCoupon=()=>{
    history.push("PurchaseCoupon/"+couponId);
}
const onChangeId=(e: { target: { value: any; }; })=>{
    setId( e.target.value)
}

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
        <TextField name="couponId" label="Choose Which one to buy" type="number" variant="outlined" color="secondary" focused onChange={onChangeId}></TextField> <br /> <br />
        <Button variant="contained"  color="secondary" onClick={buyCoupon}>Buy Coupon</Button>
        <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
    </div>
    );
}

export default PurchaseCoupons;
