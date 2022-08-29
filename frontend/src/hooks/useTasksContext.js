import { useContext } from "react";
import { TasksContext } from "../context/TasksContext";

export const useTasksContext = () => {
    const context = useContext(TasksContext);
    if(context){
        return context;
    }else{
        throw Error("useTasksContext must be used inside a TasksContextProvider.")
    }
}

export default useTasksContext;