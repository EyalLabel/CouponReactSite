import { Notyf } from "notyf";
import{duration} from "@material-ui/core"

class Notify{
    private notification= new Notyf({duration:3000,position:{x:"center",y:"center"}});

    public success(message:string){
        this.notification.success(message);
    }
    public error(message:string){
        this.notification.error(message);
    }
}
const notify= new Notify;
export default notify;