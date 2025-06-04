import { useEffect, useState } from "react";
import FriendsCards from "../components/SearchUsers/SearchFriendsCard.jsx";
import Navbar from "../components/home/NavbarSection.jsx";
import { getAllUsers } from "../api/user.jsx";

const SearchFriends = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <main className="bg-[#0e0e10] min-h-screen">
      <header>
        <Navbar />
      </header>

      <div className="pt-4 px-6 sm:px-10">
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-500 border-opacity-50"></div>
          </div>
        ) : (
          <FriendsCards users={users} />
        )}
      </div>
    </main>
  );
};

export default SearchFriends;
