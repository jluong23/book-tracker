import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useModalContext from "../hooks/useModalContext";
import useTasksContext from "../hooks/useTasksContext";
const TaskCreateForm = () => {
    // contexts
    const {dispatch} = useTasksContext();
    const { user } = useAuthContext();
    const {closeModal} = useModalContext();

    // states
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
        if(!user){
            setError("Please login to create new tasks.");
            return
        }
        const Task = {title, description, color};
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(Task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();
        if(response.ok){
            resetForm();
            // update tasks context, appending new task
            dispatch({type: "CREATE_TASK", payload: json})
            // close modal if successful
            closeModal();
        }else{
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

    }

    return (
        <form onSubmit={handleSubmit} className="text-lg">
            <h2>Create Task</h2>
            <input 
                className={emptyFields.includes('title') ? "border-error" : ""}
                onChange={(e) => setTitle(e.target.value)} 
                value={title} 
                type="text"   
                placeholder="Title" 
            /><br/>

            <input 
                className={emptyFields.includes('description') ? "border-error" : ""}
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
                type="text"
                placeholder="Description" 
            /><br/>

            <input 
                className={emptyFields.includes('color') ? "border-error" : ""}
                onChange={(e) => setColor(e.target.value)} 
                value={color}
                type="text" 
                placeholder="Color" 
            /><br/>

            {error && <div className="w-max whitespace-pre-wrap">{error}</div>}
            <input type="submit" className="pill-button text-white bg-primary hover:bg-secondary" value="Create"/>
        </form>
    )
}

export default TaskCreateForm;