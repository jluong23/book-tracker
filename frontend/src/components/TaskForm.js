import { useState } from "react";
import { Link } from "react-router-dom";
import useTasksContext from "../hooks/useTasksContext";
const TaskForm = () => {
    const {dispatch} = useTasksContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [error, setError] = useState(null);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setColor('');
        setError(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const Task = {title, description, color};
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(Task),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();
        if(response.ok){
            resetForm();
            console.log("Added new task", json);
            // update tasks context, appending new task
            dispatch({type: "CREATE_TASK", payload: json})
        }else{
            setError(json.error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Task</h2>
            <label htmlFor="title">Title: </label>
            <input name="title" onChange={(e) => setTitle(e.target.value)} value={title} type="text"/>
            <br/>
            <label htmlFor="description">Description: </label>
            <input name="description" onChange={(e) => setDescription(e.target.value)} value={description} type="text"/>
            <br/>
            <label htmlFor="color">Color: </label>
            <input name="color" type="text" onChange={(e) => setColor(e.target.value)} value={color}/>
            <br/>

            {error && 
            <div className="bg-error w-max">
                {error}
            </div>}
            <input type="submit" value="Create"/>
        </form>
    )
}

export default TaskForm;