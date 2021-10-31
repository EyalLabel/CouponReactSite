import { useHistory } from "react-router-dom";
import store from "../../../Redux/store";
import "./CustomerHomePage.css";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import { Category } from "@material-ui/icons";
import { useState } from "react";

function CustomerHomePage(): JSX.Element {
    const cusId=store.getState().AuthState.loginUser.userId;
    const history= useHistory();
    const[maxPrice,setprice]=useState('0');
    const[category,setcategory]=useState('FOOD');
    const goToCustomer=()=>{
        history.push("oneCustomer/"+cusId);
    }
    const allCoupons=()=>{
        history.push("/allCusCoupons");
    }
    const allCouponsPrice=()=>{
        history.push("/CusCouponsByPrice/"+maxPrice);
    }
    const allCouponsCategory=()=>{
        history.push("/CustomerCouponsByCategory/"+category);
    }
    const onChangeCat=(e: { target: { value: any; }; })=>{
        setcategory( e.target.value)
    }
    const onChangePrice=(e: { target: { value: any; }; })=>{
        setprice( e.target.value)
    }
    const buyCoupons=()=>{
        history.push("/buyCoupons");
    }

    return (
        <div className="CustomerHomePage">
			<h1>Welcome Customer</h1> <br />
            <h2>What would you like to do today?</h2> <br /> 
            <Button variant="contained"  color="secondary" onClick={goToCustomer}>Customer Details</Button> <br /> <br />
            <Button variant="contained"  color="secondary" onClick={allCoupons}>See All Customer Coupons </Button> <br /> <br />
            <TextField name="couponId" label="Price" type="number" variant="outlined" color="secondary" focused onChange={onChangePrice}></TextField> <br /> <br />
                    <Button variant="contained"  color="secondary" onClick={allCouponsPrice}>Get Coupons Price</Button> <br /> <br />
            <InputLabel htmlFor="select" focused>Category</InputLabel>
                <NativeSelect id="select"  variant="filled" onChange={onChangeCat} >
                <option value="FOOD">Food and Groceries</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restautrant</option>
                    <option value="VACATION">Vacation</option>
                    <option value="FASHION">Fashion</option>
                </NativeSelect>
                    <br/><br/>
                    <Button variant="contained"  color="secondary" onClick={allCouponsCategory}>See Of Category </Button> <br /> <br />
                    <Button variant="contained"  color="secondary" onClick={buyCoupons}>Buy Coupons </Button> <br /> <br />
        </div>
    );
}

export default CustomerHomePage;
