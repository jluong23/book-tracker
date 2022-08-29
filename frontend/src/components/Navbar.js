import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="bg-primary p-2">
            <Link to="/"><h1>Task Tracker</h1></Link>
        </nav>
    )
}

export default Navbar;