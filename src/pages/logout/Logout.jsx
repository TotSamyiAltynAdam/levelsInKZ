import { Navigate } from 'react-router-dom';
import { useAuthContext } from "./../../context/AuthContextProvider";

const Logout = () => {
    const { setToken } = useAuthContext();
    setToken(false);
    
    return <Navigate to='/' replace />;
}

export default Logout;