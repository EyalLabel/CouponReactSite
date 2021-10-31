import { NavLink } from "react-router-dom";
import "./aside.css";

function Aside(): JSX.Element {
    return (
        <div className="Aside">
			<h1>Menu</h1>
            <br />
            <nav className="nav">
                <NavLink exact to="/home"> Home page </NavLink> <br />
                <NavLink exact to="/login"> Login page </NavLink> <br />
                <NavLink exact to="/logout"> Logout page </NavLink> <br />
                
            </nav>
        </div>
    );
}

export default Aside;
