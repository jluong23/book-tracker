import useAuthContext from "../hooks/useAuthContext";
import useTasksContext from "../hooks/useTasksContext";


const TaskDeleteForm = ({task, closeModal}) => {
    const { dispatch } = useTasksContext();
    const { user } = useAuthContext();

    const handleDelete = async () => {
        if(!user){
            return
        }
        const response = await fetch(`/api/tasks/${task._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
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
        <div>
            <p>
                Are you sure you want to delete this task?
            </p>
            <div className="flex justify-around">
                <button onClick={handleDelete} className="pill-button bg-success">Yes</button>
                <button  onClick={closeModal} className="pill-button bg-error">No</button>

            </div>
        </div>
    )
}

export default TaskDeleteForm;