import { useState } from "react";
import { Link } from "react-router-dom";
const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [error, setError] = useState(null);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setColor('');
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
            setError(null);
            resetForm();
            console.log("Added new task", json);
        }else{
            setError(json.error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Task</h2>
            <label htmlFor="title">Title: </label>
            <input name="title" onChange={(e) => setTitle(e.target.value)} type="text" required/>
            <br/>
            <label htmlFor="description">Description: </label>
            <input name="description" onChange={(e) => setDescription(e.target.value)} type="text" required/>
            <br/>
            <label htmlFor="color">Color: </label>
            <input name="color" type="text" onChange={(e) => setColor(e.target.value)} required/>
            <br/>

            {error && 
            <div>
                {error}
            </div>}
            <input type="submit" value="Create"/>
        </form>
    )
}

export default TaskForm;