import axiosInstance from "./axiosInstanced";


const createRequest = (receiver_id) => {
    try {
        const response = axiosInstance.post('friendship/request', {receiver_id:receiver_id},{
            
            withCredentials: true
        })
       

        return response;
    } catch (error) {
        console.error("Error creating friendship request:", error);
        throw error.message
    }
}

export { createRequest }