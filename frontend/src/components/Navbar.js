import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";
const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <header className="bg-primary p-2 flex justify-between">
            <div className="site-title">
                <Link to="/"><h1>Task Tracker</h1></Link>
            </div>
            <nav>
                {user ? (
                    <div className="flex space-x-4 items-center">
                        <span>{user.email}</span>
                        <Link to="/" onClick={() => {logout()}}><h2>Log out</h2></Link>
                    </div>
                ) : (
                    <div className="flex space-x-4 items-center">
                        <Link to="/login"><h2>Log in</h2></Link>
                        <Link to="/signup"><h2>Sign up</h2></Link>
                    </div>
                )
                }
            </nav>
        </header>
    )
}

export default Navbar;