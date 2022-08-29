import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
const Home = () => {
    const {tasks, dispatch} = useTasksContext();

    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch("/api/tasks/");
            const json = await response.json();
            if(response.ok){
                // update tasks context, setting tasks to json response
                dispatch({type:'SET_TASKS', payload: json});
            }
        }
        getTasks();
    }, []);

    const noTasksError = (
        <div>There are no tasks!</div>
    )
    return (
        <div>
            <h2>All Tasks</h2>

            <div className="tasks flex">
                {tasks && tasks.length > 0 ?
                 tasks.map((task) => {
                    return (
                        <TaskDetails key={task._id} task={task}/>
                    )
                }) : noTasksError

                }

            </div>
            <TaskForm/>
        </div>
    )
}

export default Home;