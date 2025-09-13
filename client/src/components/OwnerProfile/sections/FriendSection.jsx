import React from "react";
import {useState} from 'react'
import { Link } from "react-router-dom";

const FriendsSection = ({ friends }) => {


  return (
    <section className="mt-10">
      <h3 className="text-3xl font-bold mb-8 text-cyan-400">Amigos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {friends.map((friend) => (
          <Link
            to={`/${friend.username}`}
            key={friend._id}
            className="flex items-start gap-5 p-5 bg-[#1b1b1f] rounded-2xl border border-[#2b2b30] hover:border-cyan-500 transition-all duration-300 shadow-md hover:shadow-cyan-600/10"
          >
            <img
              src={friend.avatar_url}
              alt={friend.full_name}
              className="w-24 h-24 object-cover rounded-xl border border-gray-700"
            />
            <div className="flex flex-col justify-between flex-grow">
              <div>
                <h4 className="text-2xl font-semibold text-white leading-snug">{friend.full_name}</h4>
                <p className="text-cyan-400 text-sm mb-2">@{friend.username}</p>
              </div>
              <div className="text-sm text-gray-300 mb-1">
                {friend.bio ? (
                  <p className="line-clamp-2 italic">{friend.bio}</p>
                ) : (
                  <p className="italic text-gray-500">Sin biografía</p>
                )}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-white">Email:</span> {friend.email}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FriendsSection;
