
const Tag = ({text}) => {

    return ( 
        <span className="bg-gray-400 rounded-full p-1">
            {text}
        </span>
    ) 
}
export const TaskTags = ({task}) => {

    return (
        <div className="task-tags">
            {task.resolved && <Tag text="done"/>}
        </div>
    )
}

export default TaskTags;