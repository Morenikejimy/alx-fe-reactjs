import React, { useState } from "react";
import { fetchAdvancedUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const users = await fetchAdvancedUsers(username, location, minRepos);
      setResults(users);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location (e.g., Lagos)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Results */}
      <div className="mt-6 space-y-4">
        {results.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-100"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{user.login}</p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
