import { useHistory } from "react-router";
import "./Page404.css";
import { Button } from "@material-ui/core";



function Page404(): JSX.Element {
    const history=useHistory();

    return (
        <div className="Page404">
			<h1>Oh no this page doesn't exist so please: </h1>
<img src="https://media2.giphy.com/media/fOds1qZie4qMU/giphy.gif" alt="" /> <br /> <br />
            <Button variant="contained"  color="secondary" onClick={history.goBack}>Go Back</Button>
        </div>
    );
}

export default Page404;
