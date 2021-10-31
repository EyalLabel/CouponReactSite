import "./OneCoupon.css";



interface OneCouponProps {
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
function OneCoupon(props: OneCouponProps): JSX.Element {
    return (
        <div className="custombox">
        <br />
    {props.id} <br />
    {props.title}    <br />     
    {props.category} 
    <br />
    {props.description} <br />
   price:  {props.price}  amount:  {props.amount} <br />
 valid from:  {props.startDate} until: 
    {props.endDate} <br />
    <img className="photo" src={props.image}  />
    <br /> <br />
    
    </div>
    );
}

export default OneCoupon;
