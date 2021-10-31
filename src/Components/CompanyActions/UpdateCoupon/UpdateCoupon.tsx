import "./UpdateCoupon.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import Coupon from "../../Models/Coupon";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
import notify from "../../Utils/Notify";



function UpdateCoupon(): JSX.Element {
    const {register, handleSubmit,setError, formState: { errors }} = useForm<Coupon>({
        defaultValues:{
            id:0,
            category:"",
    title:"",
    description:"",
    startDate:new Date("2021-10-11T00:00:00"),
    endDate:new Date("2023-10-11T00:00:00"),
    price:0,
    image:"",
    amount:0
        }
    });
    const history=useHistory();
    function send(coupon:Coupon){
        console.log("data arrived")
        console.log(coupon.title); 
        const token=store.getState().AuthState.loginUser.token;
    axios.post("http://localhost:8080/company/coupon/update",coupon,{headers:{"Authorization": `${token}`}})
    .then((response)=>{
        store.dispatch(loginUserString(response.headers.authorization))
        console.log(response.data);
        notify.success("Updated Successfully!");
    }).catch(error=>{
        notify.error("Updated adding coupon");
        console.log(error)
    }); 
        }
    return (
        <div className="Main">
             
        <form onSubmit={handleSubmit(send)}>
             <br />
       <Typography variant="h4" className="HeadLine">Update Coupon</Typography> <br />
       <TextField label="Coupon Id" variant="outlined"  color="secondary" name="id" type="number" focused {...register ("id")}></TextField> <br /> <br />
     <TextField label="Title" variant="outlined"  color="secondary" name="title" type="text" focused {...register ("title")}></TextField> <br /> <br />
     <TextField label="Description" variant="outlined"  color="secondary" name="description" type="text" focused {...register ("description")}></TextField> <br />  <br />
     <TextField label="Price" variant="outlined"  color="secondary" name="price" type="number" focused {...register ("price")}></TextField> <br /> <br />
     <TextField label="Amount" variant="outlined"  color="secondary" name="amount" type="number" focused {...register ("amount")}></TextField> <br /> <br />
     <InputLabel htmlFor="select"  focused>Category</InputLabel>
                <NativeSelect id="select" variant="filled" {...register("category")} >
                    <option value="FOOD">Food and Groceries</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restautrant</option>
                    <option value="VACATION">Vacation</option>
                    <option value="FASHION">Fashion</option>
                </NativeSelect>
                    <br/><br/>
     <TextField label="Expiration Date" variant="outlined"  color="secondary" name="endDate" type="date" focused {...register ("endDate")}></TextField> <br /> <br />
     <TextField label="image" variant="outlined"  color="secondary" name="image" type="text" focused {...register ("image")}></TextField>  
       <br />
       <ButtonGroup variant="contained" >
           <Button color="primary" type="submit" onClick={history.goBack}>Send</Button>
           <Button color="primary"  onClick={history.goBack}>Menu</Button>
       </ButtonGroup>
       </form >
        </div>
    );
   
}

export default UpdateCoupon;
