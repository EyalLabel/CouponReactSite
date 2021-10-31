import Company from "../../Models/Company";
import "./OneCompany.css";

interface OneCompanyProps {
	   id:number,
    name:string,
    email:string,
    password:string;
}
function OneCompany(props: OneCompanyProps): JSX.Element {
    return (
        <div className="custombox">
            <br />
		{props.id} <br />
        {props.name} 
        <br />
        {props.email}
        <br /> <br />
        </div>
    );
}

export default OneCompany;
