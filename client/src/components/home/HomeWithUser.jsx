import Navbar from "./NavbarSection.jsx";
import ContentHome from "./ContentHome.jsx";
import { useStateContext } from "../../context/user.jsx";
import { getAllPosts, createPost } from "../../api/posts.jsx";
import { useEffect, useState } from "react";

const HomeWithUser = () => {
    const { user, loading } = useStateContext();
    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getAllPosts();
                setPosts(data);
                setLoadingPosts(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
        fetchPosts();
    }, [])

    const handleCreatePost = async (content) => {
       try{
        await createPost(content);
        setPosts([content,...posts]);
       }catch(error){
        console.error("Error creating post:", error);
       }
    }

    if (loadingPosts) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0e0e10] text-white">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <main className="bg-[#0e0e10] min-h-screen">
            <main className=" pt-10 text-white flex flex-col items-center justify-between ">
              <ContentHome user={user} posts={posts} content={handleCreatePost} />
            </main>
        </main>
    );
}

export default HomeWithUser;