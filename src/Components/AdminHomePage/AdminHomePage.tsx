import { NavLink, useHistory } from "react-router-dom";
import "./AdminHomePage.css";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Company from "../Models/Company";
import { useState } from "react";
import axios from "axios";
import store from "../../Redux/store";
import { loginUserString } from "../../Redux/AuthState";
import notify from "../Utils/Notify";
import Customer from "../Models/Customer";


function AdminHomePage(): JSX.Element {
    const history= useHistory();
    const[id,setId]=useState('');
    const[cusId,setcusId]=useState('');
    
    const [companyData,setData]=useState(new Company);
    const customerUrl="http://localhost:8080/Admin/getSingleCustomer/"
    const [customerData,setCusData]=useState(new Customer);
    const {register, handleSubmit, formState: { errors }} = useForm({defaultValues:{
      test:{  companyId:""}}});
  
    const onSubmit = (data: any) => console.log(data);
    const goToCompany=()=>{
        history.push("OneCompany/"+id);
    }
    const onChange=(e: { target: { value: any; }; })=>{
        setId( e.target.value)
    }
    const onChangeCus=(e: { target: { value: any; }; })=>{
        setcusId( e.target.value)
        
    }
    const gotoCompanies=()=>{
        history.push("allCompany");
    }
    const gotoCustomers=()=>{
        history.push("allCustomers");
    }
    const goToCustomer=()=>{
        history.push("OneCustomer/"+cusId);
    }
    const goToAddCustomer=()=>{
        history.push("AddCustomer");
    }
    const goToAddCompany=()=>{
        history.push("AddCompany");
    }
    const goToupdateCompany=()=>{
        history.push("updateCompany");
    }
    const goToupdateCustomer=()=>{
        history.push("updateCustomer");
    }
    const deleteCustomer=()=>{
        history.push("deleteCustomer/"+cusId);
 }
 const deleteCompany=()=>{
    history.push("deleteCompany/"+id);
}
   
    


         

   
    return (
        <div >
			<h1>Welcome Admin</h1> <br />
            <h2>What would you like to do today?</h2> <br /> <br />
            <div id="first" style={{display: 'inline', alignItems:'center'}}>
                <Button variant="contained"  color="secondary" onClick={gotoCompanies}>See All Companies </Button> <br /> <br />
                <TextField name="companyId" label="companyId" variant="outlined" color="secondary" focused onChange={onChange}></TextField> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={goToCompany}>Get Company</Button> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={deleteCompany}>Delete Company</Button> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={goToAddCompany}>Add Company</Button> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={goToupdateCompany}>Update Company</Button> <br /> <br />
                 </div>
                 <div id="second" style={{display: 'inline', alignItems:'center'}}>
                 <Button variant="contained"  color="secondary" onClick={gotoCustomers}>See All Customers </Button> <br /> <br />
                 <TextField name="customerId" label="customerId" variant="outlined" color="secondary" focused onChange={onChangeCus}></TextField> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={deleteCustomer}>Delete Customer</Button> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={goToCustomer}>Get Customer</Button> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={goToAddCustomer}>Add Customer</Button> <br /> <br />
                 <Button variant="contained"  color="secondary" onClick={goToupdateCustomer}>Update Customer</Button> <br /> <br />
                 </div>
        </div>
    );
}

export default AdminHomePage;
