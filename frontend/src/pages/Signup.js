import { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signupPost = async (e) => {
        e.preventDefault();
        console.log(email, password);
    }
    
    return (
        <form onSubmit={(e) => {signupPost(e)}}>
            <h1>Sign Up</h1>
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
            <input type="submit" className="pill-button text-white bg-primary hover:bg-secondary" value="Sign up"/>
        </form>
    )
  
}
  
export default Signup;