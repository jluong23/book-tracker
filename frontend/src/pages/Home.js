import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
const Home = () => {
    const {tasks, dispatch} = useTasksContext();
    const { user } = useAuthContext();
    useEffect(() => {
        const getTasks = async () => {
            // append jwt token on api request
            const response = await fetch("/api/tasks/", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(response.ok){
                // update tasks context, setting tasks to json response
                dispatch({type:'SET_TASKS', payload: json});
            }
        }
        if(user){
            getTasks();
        }
    }, [user, dispatch]);

    const tasksOutput = () => {
        if(!user) {
            return <div>Please login to see tasks.</div>
        } 
        if(!tasks){
            return <div>Could not display tasks, please try again later...</div>
        }
        if(tasks.length === 0){
            return <div>There are no tasks remaining!</div>
        }
        return (
            <div className="tasks flex">
                {tasks.map((task) => {
                    return (
                        <TaskDetails key={task._id} task={task}/>
                    )
                })}
            </div>
        )
    }
    return (
        <div>
            <h2>All Tasks</h2>
            {tasksOutput()}
            <TaskForm/>
        </div>
    )
}

export default Home;