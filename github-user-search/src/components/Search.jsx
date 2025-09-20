import React, { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");   // what user types
  const [user, setUser] = useState(null);         // store API result
  const [loading, setLoading] = useState(false);  // show loading state
  const [error, setError] = useState(null);       // show error message

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchUserData(username); // call API
      setUser(data);
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading message */}
      {loading && <p>Loading...</p>}

      {/* Error message */}
      {error && <p>{error}</p>}

      {/* User info if found */}
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width="100" />
          <p>Name: {user.name ? user.name : "No name available"}</p>
          <p>Username: {user.login}</p>
          <a href={user.html_url} target="_blank" rel="noreferrer">
            Visit GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;
