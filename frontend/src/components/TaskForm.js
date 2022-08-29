import { useState } from "react";
import useTasksContext from "../hooks/useTasksContext";
const TaskForm = () => {
    const {dispatch} = useTasksContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [error, setError] = useState(null); // error string
    const [emptyFields, setEmptyFields] = useState([]); // list of strings containing which fields were empty on form submission

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setColor('');
        setError(null);
        setEmptyFields([]);
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
            // update tasks context, appending new task
            dispatch({type: "CREATE_TASK", payload: json})
        }else{
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Task</h2>
            <label htmlFor="title">Title: </label>
            <input 
                name="title"
                className={emptyFields.includes('title') ? "border-error" : ""}
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                type="text"    
            /><br/>

            <label htmlFor="description">Description: </label>
            <input 
                name="description"
                className={emptyFields.includes('description') ? "border-error" : ""}
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
                type="text"
            /><br/>

            <label htmlFor="color">Color: </label>
            <input 
                name="color"
                className={emptyFields.includes('color') ? "border-error" : ""}
                onChange={(e) => setColor(e.target.value)} 
                value={color}
                type="text" 
            /><br/>

            {error && <div className="w-max">{error}</div>}
            <input type="submit" className="pill-button text-white bg-primary hover:bg-secondary" value="Create"/>
        </form>
    )
}

export default TaskForm;