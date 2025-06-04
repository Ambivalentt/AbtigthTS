import React from "react";
import HomeWithUser from "../components/home/HomeWithUser.jsx";
import HomeNoUser from "../components/home/HomeNoUser.jsx";
import { useStateContext } from "../context/user.jsx";
export default function Home() {
  const { user } = useStateContext();

  return (
    <div>
      {user ? (
        <HomeWithUser />
      ) : (
        <HomeNoUser />
      )}
    </div>
  );
}