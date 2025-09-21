// src/components/Search.jsx
import React, { useState } from "react";
import { advancedSearchUsers } from "../services/githubService";
import UserCard from "./UserCard";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const users = await advancedSearchUsers({ username, location, minRepos });
      setResults(users);
    } catch (err) {
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-700">Advanced Search</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Min Repos"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mt-6">
        {error && <p className="text-red-500">{error}</p>}
        {results.length > 0 && (
          <div className="grid gap-4 mt-4">
            {results.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>

      {results.length > 0 && (
  <button
    onClick={loadMore}
    className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
  >
    Load More
  </button>
)}

    </section>
  );
}
