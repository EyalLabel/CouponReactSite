import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Company from "../../Models/Company";
import "./AddCompany.css";
import { Typography,TextField,ButtonGroup,Button,Select,MenuItem,InputLabel, NativeSelect } from "@material-ui/core";
import { AccountBox} from "@material-ui/icons";
import LockIcon from '@mui/icons-material/Lock';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import { useHistory } from "react-router";
import store from "../../../Redux/store";
import { loginUserString } from "../../../Redux/AuthState";
import notify from "../../Utils/Notify";
function AddCompany(): JSX.Element {

    const {register, handleSubmit, formState: { errors }} = useForm<Company>({defaultValues:{
        name:"",
        email:"",
        password:""
    }});
    const history=useHistory();
    function send(company:Company){
        let token= store.getState().AuthState.loginUser.token;
        company.id=0;
        console.log({token})
        console.log({headers:{"Authorization": token}})
       console.log("data arrived")
       console.log(company.name); 
  axios.post("http://localhost:8080/Admin/addCompany",company,{headers:{"Authorization": token}}).then((response)=>{
    store.dispatch(loginUserString(response.headers.authorization))
    notify.success("Company Added Successfully")
       console.log(response.data);})
       .catch(error=>{
           notify.error("Failed to add company")
           console.log(error);
       })
       }

    return (
        <div className="Main">
        <form onSubmit={handleSubmit(send)}>
       <Typography variant="h4" className="HeadLine">Add Company</Typography> <br />
       <AccessibilityNewIcon style={{fontSize:40, margin:10}}/>
                    <TextField label="Company Name" variant="outlined" focused
                        {...register("name",{required : true, minLength:3, maxLength:16})
}></TextField><br />
       <AccountBox style={{fontSize:40,margin:10}}></AccountBox>
       <TextField label="Email" variant="outlined"  color="secondary" focused
                        {...register("email",{
                            required : {value : true, message : "field is required"}
                            ,minLength: {value : 5, message :"minimum length must be 5"}
                        })}
></TextField> <br /> 
       <LockIcon style={{fontSize:40,margin:10}}></LockIcon>
       <TextField label="password" variant="outlined" type="password" focused
                        {...register("password",{required : true, minLength:3, maxLength:16})
}></TextField> <br /> 
       <br />
       <ButtonGroup variant="contained" >
           <Button color="primary" type="submit" onClick={handleSubmit(send)}>Send</Button>
           <Button color="primary"  onClick={history.goBack}>Menu</Button>
       </ButtonGroup>
       </form >
        </div>
    );
}

export default AddCompany;
