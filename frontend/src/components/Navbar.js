import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <header className="bg-primary p-2 flex justify-between">
            <div className="site-title">
                <Link to="/"><h1>Task Tracker</h1></Link>
            </div>
            <nav className="flex space-x-4">
                <Link to="/login"><h2>Login</h2></Link>
                <Link to="/signup"><h2>Signup</h2></Link>
            </nav>
        </header>
    )
}

export default Navbar;