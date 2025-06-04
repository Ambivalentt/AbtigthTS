import axiosInstance from "./axiosInstanced";

const createUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data;
        throw new Error(errorMessage.message || 'an unknown error occurred while fetching data');
    }
}

const loginUser = async (formData) => {
    try {
        const response = await axiosInstance.post('/user/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data.user;
    } catch (error) {
        const errorMessage = error.response?.data;
        throw new Error(errorMessage.message || 'an unknown error occurred while fetching data');
    }
}
const logOut = async () => {
    try {
        const response = await axiosInstance.get('/user/logout', {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data;
        throw new Error(errorMessage.message || 'an unknown error occurred while logging out');
    }
}
const getUserProfile = async (username) => {
    try {
        const response = await axiosInstance.get(`/user/${username}`)
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        const errorMessage = error.response?.data;
        throw new Error(errorMessage.message || 'an unknown error occurred while fetching user profile');
    }
}

const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/user/searchFriends');
        return response.data;
    } catch (error) {
        console.error("Error searching users:", error);
        const errorMessage = error.response?.data;
        throw new Error(errorMessage.message || 'an unknown error occurred while searching users');
    }
}
export { createUser, loginUser, logOut, getUserProfile, getAllUsers };