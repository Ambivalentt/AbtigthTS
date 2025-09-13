import axiosInstance from "./axiosInstanced";

const createPost = async (content) => {
    try{
        const response = await axiosInstance.post('posts/create', content , {
            withCredentials: true
        });
        return response.data;   
    }catch(error){
        console.error("Error creating post:", error);
        throw error.message;
    }
}

const getAllPosts = async () => {
    try {
        const response = await axiosInstance.get('posts/all', {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching all posts:", error);
        throw error.message;
    }
}

export { getAllPosts,createPost }