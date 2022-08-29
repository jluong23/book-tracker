import { useEffect, useState } from "react";
import BookDetails from "../components/BookDetails";
const Home = () => {
    const [books, setBooks] = useState(null);

    useEffect(() => {
        const getBooks = async () => {
            const response = await fetch("/api/books/");
            const json = await response.json();
            if(response.ok){
                setBooks(json)
            }
        }
        getBooks();
    }, []);

    return (
        <div>
            <h1>All Books</h1>
            <div className="books">
                {books && books.map((book) => {
                    return (
                        <BookDetails key={book._id} book={book}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;