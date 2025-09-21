import ShowDetails from "../components/home/ProfileDetails";
import { useState, useEffect } from "react";
import { getUserProfile, } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import LoadingProfile from "../components/home/LoadingProfile";
import NotFound404 from "./NotFound404";
import OwnerProfile from "../components/OwnerProfile/OwnerProfile.jsx";
import { useStateContext } from "../context/user.jsx";
import { friendShipStatusByParams } from '../api/friendship.jsx'
import { set } from "mongoose";

const MyProfile = () => {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null)
    const [userFound, setUserFound] = useState(null);
    const [friends, setFriends] = useState([]);
    const [friendsLoading, setFriendsLoading] = useState(true);
    const { username } = useParams();
    const { user, getAllFriendsByUser } = useStateContext();
    //buttons state
    const [buttonFriendStatus, setButtonFriendStatus] = useState(null);
    const [buttonLoading, setButtonLoading] = useState(true);

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
        } catch (error) {
            console.error("Error fetching friends:", error);
        } finally {
            setFriendsLoading(false);
        }
    }


    useEffect(() => {
        setButtonFriendStatus(null);
        setButtonLoading(true);
        setLoading(true);
        setFriends([])
        fetchUserProfile();
        fetchFriends();
        fetchButtonFriendStatus();
    }, [username]);


    const fetchButtonFriendStatus = async () => {
        try {
            if (!user) return;
            if (user.username === username) return;
            const response = await friendShipStatusByParams(username);
            if (!response) return
            setButtonFriendStatus(response.status)
        } catch (error) {
            console.error("Error fetching friend requests:", error);
        } finally {
            setButtonLoading(false);
        }
    }

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
                        <ShowDetails
                            userProfile={userProfile}
                            friends={friends}
                            friendsLoading={friendsLoading}
                            buttonFriendStatus={buttonFriendStatus}
                            buttonLoading={buttonLoading} />
                    )}
                </main>
            )}
        </main>

    )
}

export default MyProfile;