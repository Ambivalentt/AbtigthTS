
import axiosInstance from '../api/axiosInstanced'
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/user/profile', {
                withCredentials: true
            });

            setUser(response.data);
            setLoading(false);
        } catch (error) {
            throw new Error('No user found');
        } finally {
            setLoading(false);
        }
    };

    const getAllFriendsByUser = async (param) => {
        try {
            const response = await axiosInstance.get(`friendship/${param}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching all friends:", error);
            throw error.message;
        }
    }
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, getAllFriendsByUser }}>
            {children}
        </UserContext.Provider>
    )
}

const useStateContext = () => React.useContext(UserContext);
export { UserProvider, useStateContext };