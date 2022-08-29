import useTasksContext from "../hooks/useTasksContext";

const TaskDetails = ({task}) => {
    const { dispatch } = useTasksContext();
    const handleDelete = async () => {
        const response = await fetch(`/api/tasks/${task._id}`, {
            method: 'DELETE'
        });
        const json = await response.json();
        if(response.ok){
            // update tasks context
            dispatch({
                type: 'DELETE_TASK',
                payload: json
            })
        }
    }
    return (
        <div className="p-2 m-4 border-2 w-max">
            <h2 className="font-bold">{task.title}</h2>
            <p>Description: {task.description}</p>
            <p className="">Color: {task.color}</p>
            <p>{task.createdAt}</p>
            <button onClick={handleDelete} className="pill-button text-white bg-error hover:bg-errorHover">Delete</button>
        </div>
    )
}

export default TaskDetails;