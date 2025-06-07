import ShowDetails from "../components/home/ProfileDetails";
import { useState, useEffect } from "react";
import { getUserProfile,  } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProfile from "../components/home/LoadingProfile";
import NotFound404 from "./NotFound404";
import Navbar from "../components/home/NavbarSection.jsx";
import OwnerProfile from "../components/OwnerProfile/OwnerProfile.jsx";
import { useStateContext } from "../context/user.jsx";


const MyProfile = () => {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null)
    const [userFound, setUserFound] = useState(null);

    const { username } = useParams();
    const navigate = useNavigate();
    const { user } = useStateContext();

    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile(username);
            if (!profile || Object.keys(profile).length === 0) {
                setUserFound(false);
                return;
            }
            setUserProfile(profile);
            setUserFound(true);
        } catch (error) {
            setUserFound(false);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchUserProfile();
        console.log("Fetching user profile for:", username);
    }, [username]);

    if (userFound === false) {
        return <NotFound404 />
    }


    return (
        <main className="bg-[#0e0e10] min-h-screen ">
            {loading ? (
               <main className="pt-4">
                 <LoadingProfile />
               </main>
            ) : (
                <main className="pt-4">
                    {user && user.username === username ? (
                        <OwnerProfile userProfile={userProfile}  />
                    ) : (
                        <ShowDetails userProfile={userProfile}  />
                    )}
                </main>
            )}
        </main>

    )
}

export default MyProfile;