import {AiFillCloseCircle} from "react-icons/ai"

const Modal = ({content, closeModal}) => {
    return (
        // backdrop
        <div className="fixed inset-0 bg-opacity-30 bg-black backdrop-blur-sm flex justify-center items-center">
            {/* Modal */}
            <div className="bg-white p-2 rounded">
                <AiFillCloseCircle className="right-0 float-right relative cursor-pointer text-lg" onClick={closeModal}/>
                {content}
            </div>
        </div>
    )
}

export default Modal;