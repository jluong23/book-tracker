import { useState } from "react"
import {AiOutlinePlusCircle} from "react-icons/ai"
import Modal from "./Modal";
import TaskCreateForm from "./TaskCreateForm";

const TaskIcons = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div className="text-2xl flex items-center mx-2">
            <AiOutlinePlusCircle onClick={() => {setModalVisible(true)}} className="cursor-pointer text-red-400"/>
            {modalVisible && <Modal closeModal={() => {setModalVisible(false)}} content={<TaskCreateForm/>}/>}
        </div>
    )
}

export default TaskIcons;