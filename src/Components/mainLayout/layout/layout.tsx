import { BrowserRouter } from "react-router-dom";
import Aside from "../aside/aside";
import Footer from "../footer/footer";
import Header from "../Header/Header";
import MainScreen from "../Main/MainScreen";
import Main from "../Main/MainScreen";
import Routing from "../Routing/Routing";
import "./layout.css";

function Layout(): JSX.Element {
    return (
       
        <div className="layout">
            <BrowserRouter>
           <header>
               <Header></Header>
           </header>
           <aside><Aside></Aside></aside>
          <main><Routing></Routing></main>
            <footer><Footer></Footer></footer>
            </BrowserRouter>
        </div>
      
    );
}

export default Layout;
