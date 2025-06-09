
import axiosInstance from "./axiosInstanced";



const createRequest = (receiver_id) => {
    try {
        const response = axiosInstance.post('friendship/request', { receiver_id: receiver_id }, {
            withCredentials: true
        })
        return response;
    } catch (error) {
        console.error("Error creating friendship request:", error);
        throw error.message
    }
}

const allRequestsendedByUser = async () => {
    try {
        const response = await axiosInstance.get(`friendship/relationShip`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching friendship requests:", error);
        throw error.message;
    }
}

const friendShipRequest = async () => {
    try {
        const response = await axiosInstance.get(`friendship/notifyFriendShipReq`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching friendship requests:", error);
        throw error.message;
    }
}

const acceptFriendshipRequest = async (requestId) => {
    try {
     const response = await axiosInstance.put(`friendship/accept`, { request_id: requestId }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error accepting friendship request:", error);
        throw error.message;
    }
}


export { createRequest, allRequestsendedByUser, friendShipRequest, acceptFriendshipRequest };