import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState('init');
    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await getAccessToken();
                // setToken(response.accessToken);
                setToken(localStorage.getItem('token'));
            } catch (error) {
                setToken(false);
            }
        }
        
        fetchData();
    });

    return (
        <AuthContext.Provider value = {{token, setToken}}>
            {token === 'init' ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw Error('The compenet must be in the AuthContextProvider');
    }
    return context;
}

export default AuthContextProvider;