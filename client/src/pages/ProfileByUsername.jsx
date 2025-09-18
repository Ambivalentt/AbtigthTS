import ShowDetails from "../components/home/ProfileDetails";
import { useState, useEffect } from "react";
import { getUserProfile, } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProfile from "../components/home/LoadingProfile";
import NotFound404 from "./NotFound404";
import OwnerProfile from "../components/OwnerProfile/OwnerProfile.jsx";
import { useStateContext } from "../context/user.jsx";


const MyProfile = () => {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null)
    const [userFound, setUserFound] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendsLoading, setFriendsLoading] = useState(true);
    const { username } = useParams();
    const { user, getAllFriendsByUser } = useStateContext();

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

    const fetchFriends = async () => {
        try {
            const friendsData = await getAllFriendsByUser(username);
            setFriends(friendsData);
            console.log(friendsData);
        } catch (error) {
            console.error("Error fetching friends:", error);
        } finally {
            setFriendsLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true);
        fetchUserProfile();
        fetchFriends();
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
                        <OwnerProfile userProfile={userProfile} friends={friends} friendsLoading={friendsLoading} />
                    ) : (
                        <ShowDetails userProfile={userProfile} friends={friends} friendsLoading={friendsLoading} />
                    )}
                </main>
            )}
        </main>

    )
}

export default MyProfile;