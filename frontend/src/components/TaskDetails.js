import useTasksContext from "../hooks/useTasksContext";
import moment from 'moment';
import {ImBin, ImPencil} from 'react-icons/im'
import useAuthContext from "../hooks/useAuthContext";

const TaskDetails = ({task}) => {
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

    const handleEdit = async () => {
        if(!user){
            return
        }  
        const title = "edited";
        const description = "edited";
        const color = "edited";

        const response = await fetch(`/api/tasks/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, color})
        });
        const json = await response.json();
        if(response.ok){
            // update tasks context
            dispatch({
                type: 'UPDATE_TASK',
                payload: json
            })
        }
    }
    return (
        <div className="p-2 m-4 border-2 w-max">
            <h2 className="font-bold">{task.title}</h2>
            <p className="font-semibold">{moment(task.updatedAt).format('LLL')}</p>
            <p className="my-2">Description: {task.description}</p>
            <div className="flex justify-between">
                <ImBin onClick={handleDelete} className="cursor-pointer text-lg"/>
                <ImPencil onClick={handleEdit} className="cursor-pointer text-lg"/>
            </div>
        </div>
    )
}

export default TaskDetails;