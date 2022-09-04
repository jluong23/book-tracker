import { useState } from "react"
import {AiOutlinePlusCircle} from "react-icons/ai"
import useModalContext from "../hooks/useModalContext";
import TaskCreateForm from "./TaskCreateForm";

const TagCreateForm = () => {
    return (
        <div>
            <h1 className="whitespace-nowrap">Add a new tag</h1>
            <p>Under development...</p>
        </div>
    )
}

const Tag = ({text}) => {

    return ( 
        <span className="bg-gray-400 rounded-full p-1 text-sm">
            {text}
        </span>
    ) 
}
export const TaskTags = ({task}) => {
    const { openModal } = useModalContext();

    return (
        <div className="flex items-center gap-1">
            {task.resolved && <Tag text="Done"/>}
            <AiOutlinePlusCircle 
                onClick={() => {openModal(<TagCreateForm/>)}} 
                className="cursor-pointer text-lg"
                title="Add new tag"    
            />
        </div>
    )
}

export default TaskTags;