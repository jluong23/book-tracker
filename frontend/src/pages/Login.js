import { useState } from "react";
import { useNavigate } from "react-router";
import useLogin from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoading, error} = useLogin();

    const loginPost = async (e) => {
        e.preventDefault();
        await login(email, password);
    }
    
    return (
        <form onSubmit={(e) => {loginPost(e)}}>
            <h1>Log In</h1>
            <label>Email: </label>
            <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email"    
            /><br/>
            <label>Password: </label>
            <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                type="password"    
            /><br/>
            {error && <div>{error}</div>}
            <input 
                type="submit" 
                className="pill-button text-white bg-primary hover:bg-secondary" 
                value="Login"
                disabled={isLoading}
            />
        </form>
    )
  
}
  
export default Login;