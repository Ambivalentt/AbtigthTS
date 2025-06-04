import { set } from 'mongoose';
import axiosInstance from '../api/axiosInstanced'
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

     const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/user/profile',{
                    withCredentials: true
                });
                setUser(response.data);
            } catch (error) {
              throw new Error('Failed to fetch user profile');
            }
        };

    useEffect(() => {
       fetchUser();
    }, []);

    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

const useStateContext = () => React.useContext(UserContext);
export { UserProvider, useStateContext };