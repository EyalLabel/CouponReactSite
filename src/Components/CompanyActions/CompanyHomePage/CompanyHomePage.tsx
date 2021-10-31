import { useHistory, useParams } from "react-router-dom";
import "./CompanyHomePage.css";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { loginUser, loginUserString } from "../../../Redux/AuthState";
import axios from "axios";
import UserDetails from "../../LoginUpgraded/UserDetails";
import Company from "../../Models/Company";
import Coupon from "../../Models/Coupon";
import notify from "../../Utils/Notify";
function CompanyHomePage(): JSX.Element {
    const history= useHistory();
    const companyId=store.getState().AuthState.loginUser.userId;
    const[couponId,setcouponId]=useState('');
    const[category,setcategory]=useState('FOOD');
    const[maxPrice,setprice]=useState('');
   
    

    
    
    const onChange=(e: { target: { value: any; }; })=>{
        setcouponId( e.target.value)
    }
    const onChangeCat=(e: { target: { value: any; }; })=>{
        setcategory( e.target.value)
    }
    const onChangePrice=(e: { target: { value: any; }; })=>{
        setprice( e.target.value)
    }
    const allCoupons=()=>{
        history.push("/allCoupons");
    }
    const addCoupons=()=>{
        history.push("/addCoupon");
    }
    const updateCoupons=()=>{
        history.push("/updateCoupon");
    }
    const goToCompany=()=>{
        history.push("OneCompany/"+companyId);
    }
    const goToCouponsCategory=()=>{
        history.push("CouponsByCategory/"+category);
    }
    const goToCouponsPrice=()=>{
        history.push("CouponsByPrice/"+maxPrice);
    }
    const deleteCoupon=()=>{
        history.push("deleteDaCoup/"+couponId);
    }
    
    
    return (
        <div className="CompanyHomePage">
			<div className="Main">
			<h1>Welcome Company</h1> <br />
            <h2>What would you like to do today?</h2> <br /> 
            <div id="first">
                
            <Button variant="contained"  color="secondary" onClick={goToCompany}>Company Details </Button> <br /> <br />
                <Button variant="contained"  color="secondary" onClick={allCoupons}>See All Coupons </Button> <br /> <br />
                <Button variant="contained"  color="secondary" onClick={addCoupons}>Add new Coupons </Button> <br /> <br />
                <Button variant="contained"  color="secondary" onClick={updateCoupons}>Update Coupons </Button> <br /> <br />
                </div>
                <div id="third">
                <TextField name="couponId" label="couponId" variant="outlined" color="secondary" focused onChange={onChange}></TextField> <br /> <br />
            <Button variant="contained"  color="secondary" onClick={deleteCoupon}>Delete Coupon</Button> <br /> <br />
                    <TextField name="couponId" label="Price" type="number" variant="outlined" color="secondary" focused onChange={onChangePrice}></TextField> <br /> <br />
                    <Button variant="contained"  color="secondary" onClick={goToCouponsPrice}>Get Coupons Price</Button> <br /> <br />
                    </div>
                <div id="second">
           
            <InputLabel htmlFor="select" focused>Category</InputLabel>
                <NativeSelect id="select"  variant="filled" onChange={onChangeCat} >
                <option value="FOOD">Food and Groceries</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restautrant</option>
                    <option value="VACATION">Vacation</option>
                    <option value="FASHION">Fashion</option>
                </NativeSelect> <br /> <br />
                <Button variant="contained"  color="secondary" onClick={goToCouponsCategory}>Get Coupons Category </Button> <br /> <br />
                    <br/> </div>  
               
        </div>
        </div>
    );
}

export default CompanyHomePage;
