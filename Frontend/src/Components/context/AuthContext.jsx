import {createContext, useState, useEffect, useContext} from "react";


const authContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(() => sessionStorage.getItem("token"));
    const [user, setUser] = useState(undefined);


    useEffect(() => {


        if (!token) {

            setUser(null);
            return;
        }
        fetch("/api/dashboard-data", {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => setUser(data))
        .catch(() => {

            sessionStorage.removeItem("token");
            setToken(null);
            setUser(null);
        });

    }, [token]);


    const login = (newToken) => {

        sessionStorage.setItem("token", newToken);
        setToken(newToken);

    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };
    return (
        <authContext.Provider value={{ token, user, login, logout }}>
            {children}
        </authContext.Provider>
    );
}

export const useAuth = () => useContext(authContext);