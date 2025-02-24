import React, { createContext, useContext } from 'react';
import AuthContext from './AuthContext';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
    const { token } = useContext(AuthContext);

    const fetchData = async (url, method = 'GET', body = null) => {
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };

        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        const data = await response.json();
        return data;
    };

    return (
        <ApiContext.Provider value={{ fetchData }}>
            {children}
        </ApiContext.Provider>
    );
};

export default ApiContext;
