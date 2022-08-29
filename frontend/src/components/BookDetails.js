import { Link } from "react-router-dom";
const BookDetails = ({book}) => {
    return (
        <div className="book-details p-2 m-4 border-2 w-max">
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>Rating {book.rating}/5</p>
            <p>{book.createdAt}</p>
        </div>
    )
}

export default BookDetails;