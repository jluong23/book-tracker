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

    return (
        <div>
            <h1>All Tasks</h1>

            <div className="tasks flex flex-col">
                {tasks && tasks.map((task) => {
                    return (
                        <TaskDetails key={task._id} task={task}/>
                    )
                })}
            </div>
            <TaskForm/>
        </div>
    )
}

export default Home;