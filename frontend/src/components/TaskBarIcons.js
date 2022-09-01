import { useState } from "react"
import {AiOutlinePlusCircle} from "react-icons/ai"
import useModalContext from "../hooks/useModalContext";
import TaskCreateForm from "./TaskCreateForm";

const TaskBarIcons = () => {
    const { openModal } = useModalContext();

    return (
        <div className="text-2xl flex items-center mx-2">
            <AiOutlinePlusCircle onClick={() => {openModal(<TaskCreateForm/>)}} className="cursor-pointer text-red-400"/>
        </div>
    )
}

export default TaskBarIcons;