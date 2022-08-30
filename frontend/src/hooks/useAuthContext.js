import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(context){
        return context;
    }else{
        throw Error("useAuthContext must be used inside a AuthContextProvider.")
    }
}

export default useAuthContext;