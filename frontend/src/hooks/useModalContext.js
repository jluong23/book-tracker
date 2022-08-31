import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if(context){
        return context;
    }else{
        throw Error("useModalContext must be used inside a ModalContextProvider.")
    }
}

export default useModalContext;