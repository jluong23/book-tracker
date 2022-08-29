import { Link } from "react-router-dom";
const TaskDetails = ({task}) => {
    return (
        <div className="p-2 m-4 border-2 w-max">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="">Color: {task.color}</p>
            <p>{task.createdAt}</p>
        </div>
    )
}

export default TaskDetails;