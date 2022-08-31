import { useState } from "react";
import useSignup from "../hooks/useSignup";
import useLogin from "../hooks/useLogin";
import {Link} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai"
import {RiLockPasswordLine} from "react-icons/ri"
const LoginForm = ({formType}) => {
    // form type is 'login' or 'signup'
    if(!["login", "signup"].includes(formType)){
        console.error("formType in LoginForm must be 'login' or 'signup'. Using this form as a signup. ");
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoading:isLoggingIn, error:loginError} = useLogin();
    const {signup, isLoading:isSigningUp, error:signupError} = useSignup();
    
    const error = formType === "login" ? loginError : signupError;
    const isLoading = formType === "login" ? isLoggingIn : isSigningUp;
    const formattedFormType = formType === "login" ? "Login" : "Sign up" //used for buttons and title of page
    const redirectLink = formType === "login" ? // displayed at bottom of form
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        : 
        <p> Already have an account? <Link to="/login">Log in</Link> </p> 
    

    const handlePostRequest = async (e) => {
        e.preventDefault();
        formType === "login" ? await login(email, password) : await signup(email, password)
    }
    
    return (
        <form className="space-y-2" onSubmit={(e) => {handlePostRequest(e)}}>
            <h1>{formattedFormType}</h1>
            <div className="flex items-center space-x-1">
                <AiOutlineMail/>
                <input 
                    placeholder={"Email"}
                    className="bg-transparent border-0 border-b-2 border-gray-500" //only bottom border
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    type="email"    
                />
            </div>
            <div className="flex items-center space-x-1">
                <RiLockPasswordLine/>
                <input 
                    className="bg-transparent border-0 border-b-2 border-gray-500" //only bottom border
                    placeholder={"Password"}
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    type="password"    
                />
            </div>
            {error && <div>{error}</div>}
            <input 
                type="submit" 
                className="pill-button text-white bg-primary hover:bg-secondary" 
                value={formattedFormType}
                disabled={isLoading}
            />        
            {redirectLink}
        </form>
    )
  
}
  
export default LoginForm;