import { Navigate } from "react-router-dom";
import { canAccess } from "../utils/permissions";


function ProtectedRoute({permission, children}){

    if(!canAccess(permission)){
        return <Navigate to="/map"/>;
    }


    return children;

}


export default ProtectedRoute;
