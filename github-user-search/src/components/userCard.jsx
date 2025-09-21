// src/components/UserCard.jsx
import React, { useEffect, useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function UserCard({ user }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await fetchUserData(user.login);
        setDetails(data);
      } catch (err) {
        console.error("Failed to load user details", err);
      }
    }
    loadDetails();
  }, [user.login]);

  if (!details) {
    return (
      <div className="border rounded-lg p-4 flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-16 h-16 rounded-full"
        />
        <p className="text-gray-600">{user.login} (Loading details...)</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 flex items-center gap-4 shadow-sm bg-white">
      <img
        src={details.avatar_url}
        alt={details.login}
        className="w-16 h-16 rounded-full"
      />
      <div>
        <h3 className="text-lg font-semibold">{details.name || details.login}</h3>
        {details.location && (
          <p className="text-gray-500">📍 {details.location}</p>
        )}
        <p className="text-gray-500">Repos: {details.public_repos}</p>
        <a
          href={details.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}
