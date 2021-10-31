import "./OneCustomer.css";

interface OneCustomerProps {
    id:number,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
}

function OneCustomer(props: OneCustomerProps): JSX.Element {
    return (
        <div className="custombox">
            <br />
		{props.id} <br />
        {props.firstName} 
        <br />
        {props.lastName} <br />
        {props.email}
        <br /> <br />
        </div>
    );
}

export default OneCustomer;
