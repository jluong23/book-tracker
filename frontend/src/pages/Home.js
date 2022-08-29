import { useEffect, useState } from "react";
import TaskDetails from "../components/taskDetails";
import TaskForm from "../components/TaskForm";
const Home = () => {
    const [tasks, setTasks] = useState(null);

    useEffect(() => {
        const getTasks = async () => {
            const response = await fetch("/api/tasks/");
            const json = await response.json();
            if(response.ok){
                setTasks(json)
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