import { env } from "process";

 class Globals{}

 class developmentGlobals extends Globals{
     public urls={
         administrator:"http://localhost:8080/Admin/",
         company: "http://localhost:8080/company/",
         customer:"http://localhost:8080/customer/"
     }
 }

class ProductiontGlobals extends Globals{
    public urls={
        administrator:"/Admin/",
        company: "/company/",
        customer:"/customer/",
        general:"/"
    }
}

const globals=process.env.NODE_ENV==="production"? new ProductiontGlobals() : new developmentGlobals();

export default globals;