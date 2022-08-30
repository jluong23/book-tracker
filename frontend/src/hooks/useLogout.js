import useAuthContext from "./useAuthContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user');
        // update auth context
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}


export default useLogout;