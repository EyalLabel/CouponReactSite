import { Logout } from "@mui/icons-material";
import { Redirect, Route, Switch } from "react-router-dom";
import AddCompany from "../../AdminActions/AddCompany/AddCompany";
import AddCustomer from "../../AdminActions/AddCustomer/AddCustomer";
import AdminGetCompanies from "../../AdminActions/AdminGetCompanies/AdminGetCompanies";
import AdminOneCompany from "../../AdminActions/AdminOneCompany/AdminOneCompany";
import DeleteCompany from "../../AdminActions/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../AdminActions/DeleteCustomer/DeleteCustomer";
import GetAllCustomers from "../../AdminActions/GetAllCustomers/GetAllCustomers";
import GetCustomer from "../../AdminActions/getCustomer/getCustomer";
import UpdateCompany from "../../AdminActions/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminActions/UpdateCustomer/UpdateCustomer";
import AdminHomePage from "../../AdminHomePage/AdminHomePage";
import AddCoupon from "../../CompanyActions/AddCoupon/AddCoupon";
import CompanyHomePage from "../../CompanyActions/CompanyHomePage/CompanyHomePage";
import DeleteCoupon from "../../CompanyActions/DeleteCoupon/DeleteCoupon";
import GetAllCoupons from "../../CompanyActions/GetAllCoupons/GetAllCoupons";
import GetCouponByCategory from "../../CompanyActions/GetCouponByCategory/GetCouponByCategory";
import GetCouponByMaxPrice from "../../CompanyActions/GetCouponByMaxPrice/GetCouponByMaxPrice";
import UpdateCoupon from "../../CompanyActions/UpdateCoupon/UpdateCoupon";
import CustomerHomePage from "../../CustomerActions/CustomerHomePage/CustomerHomePage";
import GetAllCusCoupons from "../../CustomerActions/GetAllCusCoupons/GetAllCusCoupons";
import GetCusCouponsCategory from "../../CustomerActions/GetCusCouponsCategory/GetCusCouponsCategory";
import GetCusCouponsMaxPrice from "../../CustomerActions/GetCusCouponsMaxPrice/GetCusCouponsMaxPrice";
import PurchasableCoupon from "../../CustomerActions/PurchasableCoupon/PurchasableCoupon";
import PurchaseCoupons from "../../CustomerActions/PurchaseCoupons/PurchaseCoupons";
import LoginUpgraded from "../../LoginUpgraded/LoginUpgraded";
import LogOutScreen from "../../LogOutScreen/LogOutScreen";
import Page404 from "../../Page404/Page404";
import MainScreen from "../Main/MainScreen";

import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={MainScreen} exact/>
                <Route path="/login" component={LoginUpgraded} exact/>
                <Route path="/logout" component={LogOutScreen} exact/>
                <Route path="/oneCompany/:companyId" component={AdminOneCompany} exact/>
                <Route path="/allCompany" component={AdminGetCompanies} exact/>
                <Route path="/allCustomers" component={GetAllCustomers} exact/>
                <Route path="/addCustomer" component={AddCustomer} exact/>
                <Route path="/addCompany" component={AddCompany} exact/>
                <Route path="/updateCompany" component={UpdateCompany} exact/>
                <Route path="/updateCustomer" component={UpdateCustomer} exact/>
                <Route path="/oneCustomer/:customerId" component={GetCustomer} exact/>
                <Route path="/admin" component={AdminHomePage} exact/>
                <Route path="/company" component={CompanyHomePage} exact/>
                <Route path="/allCoupons" component={GetAllCoupons} exact/>
                <Route path="/allCusCoupons" component={GetAllCusCoupons} exact/>
                <Route path="/CouponsByCategory/:category" component={GetCouponByCategory} exact/>
                <Route path="/CustomerCouponsByCategory/:category" component={GetCusCouponsCategory} exact/>
                <Route path="/CouponsByPrice/:maxPrice" component={GetCouponByMaxPrice} exact/>
                <Route path="/CusCouponsByPrice/:maxPrice" component={GetCusCouponsMaxPrice} exact/>
                <Route path="/deleteCompany/:companyId" component={DeleteCompany} exact/>
                <Route path="/deleteCustomer/:customerId" component={DeleteCustomer} exact/>
                <Route path="/deleteDaCoup/:couponId" component={DeleteCoupon} exact/>
                <Route path="/PurchaseCoupon/:couponId" component={PurchasableCoupon} exact/>
                <Route path="/addCoupon" component={AddCoupon} exact/>
                <Route path="/buyCoupons" component={PurchaseCoupons} exact/>
                <Route path="/updateCoupon" component={UpdateCoupon} exact/>
                <Route path="/customer" component={CustomerHomePage} exact/>
                <Redirect from="/" to="/home" exact />
                <Route component={Page404}/>
            </Switch>
            
        </div>
    );
}

export default Routing;
