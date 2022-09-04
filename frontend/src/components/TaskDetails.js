import useTasksContext from "../hooks/useTasksContext";
import moment from 'moment';
import {ImBin, ImPencil} from 'react-icons/im'
import {BiArrowBack} from 'react-icons/bi';
import {FaSave} from 'react-icons/fa'
import useAuthContext from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import TaskDeleteForm from "./TaskDeleteForm";
import useModalContext from "../hooks/useModalContext";
import TaskTags from "./TaskTags";

const TaskDetails = ({task}) => {
    const { dispatch:tasksDispatch } = useTasksContext();
    const { user } = useAuthContext();
    const { openModal } = useModalContext();
    // states used for editing the task.
    // for printing original task properties, use attributes of task
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [color, setColor] = useState(task.color);

    const openDeleteTaskModal = () => {
        openModal(<TaskDeleteForm task={task} />);
    }
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    /**
     * Create a patch request to '/api/tasks/<task._id>
     * @param {boolean} resolved Sets the task.resolve property 
     * @returns 
     */
    const handleEditRequest = async (resolved) => {
        if(!user){
            return
        }  
        const editedTask = {title,description,color};
        if(resolved != null){
            editedTask.resolved = resolved;
        }

        const response = await fetch(`/api/tasks/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTask)
        });
        const json = await response.json();
        if(response.ok){
            // update tasks context
            tasksDispatch({
                type: 'UPDATE_TASK',
                payload: json
            })
        }
    }


    const editModeOuput = (
        <div className="p-2 m-4 border-2">
            <form>
                <input 
                    onChange={(e) => setTitle(e.target.value)} 
                    value={title} 
                    type="text"    
                /><br/>
                <p className="font-semibold">{moment(task.updatedAt).format('LLL')}</p>
                <input 
                    onChange={(e) => setDescription(e.target.value)} 
                    value={description} 
                    type="email"    
                /><br/>
            </form>
            <div className="flex justify-between text-lg">
                <BiArrowBack onClick={toggleEditMode} className="cursor-pointer text-lg"/>
                <ImBin onClick={openDeleteTaskModal} className="cursor-pointer text-lg"/>
                {/* make request and toggle edit mode when save button is pressed. */}
                <FaSave onClick={() => {handleEditRequest(); toggleEditMode();}} className="cursor-pointer text-lg"/>
                
            </div>
        </div>
    )

    const viewModeOutput = (
        <div className="p-2 m-4 border-2 border-black border-opacity-20">
            <TaskTags task={task}/>
            <h2 className="font-bold">{task.title}</h2>
            <p className="font-semibold">{moment(task.updatedAt).format('LLL')}</p>
            <p className="my-2">{task.description}</p>
            <div className="flex justify-between text-lg">
                <ImPencil onClick={() => {toggleEditMode()}} className="cursor-pointer text-lg"/> {/* Toggle edit mode when pressed. */}
                <input type={"checkbox"} checked={task.resolved} onChange={(e) => {handleEditRequest(e.target.checked)}} className={"cursor-pointer"}/>
            </div>
        </div>
    )
    return (
        <div>
            {editMode ? editModeOuput : viewModeOutput}

        </div>
    )
}

export default TaskDetails;