import axiosInstance from "./axiosInstanced";
import { io } from "socket.io-client";

const createConversation = async (receiver_id) => {
    console.log("Creating conversation with receiver_id:", receiver_id);
    try {
        const response = await axiosInstance.post('conversation/create',
            { other_user_id: receiver_id }
            , {
                withCredentials: true
            });
        return response.data;
    } catch (error) {
        console.error("Error creating conversation:", error);
        throw error.message;
    }
}


const getConversations = async () => {
    try {
        const response = await axiosInstance.get('conversation/getConversations', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching conversations:", error);
        throw error.message;
    }
}

const sendMessage = async (conversationId, message) => {
    try {
        const response = await axiosInstance.post('message/send', {
            conversation_id: conversationId,
            text: message
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error.message;
    }
}

const getMessages = async (conversationId) => {
    try {
        const response = await axiosInstance.post(`message/getMessages`, {
            conversation_id: conversationId
        }, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error.message;
    }
}

const socketapi = io('http://localhost:3000',
    {
        withCredentials: true,
        transports: ['websocket']
    });
export { createConversation, getConversations, sendMessage, getMessages, socketapi };