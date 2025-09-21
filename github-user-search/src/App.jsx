// src/App.js
import React, { useState } from 'react';
import Search from './components/Search';
import { fetchAdvancedUserData } from './services/githubService';
import './index.css'; // Make sure this imports your Tailwind CSS

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentSearchParams, setCurrentSearchParams] = useState({});

  const handleAdvancedSearch = async (params, page = 1) => {
    setLoading(true);
    setError(null);
    if (page === 1) setSearchResults([]); // Clear results for a new search
    setCurrentSearchParams(params); // Store current search params for pagination

    const result = await fetchAdvancedUserData({ ...params, page });

    if (result.success) {
      // GitHub Search API returns 'items' for users and 'total_count'
      setSearchResults(prevResults => (page === 1 ? result.data.items : [...prevResults, ...result.data.items]));
      // GitHub API has a maximum of 1000 search results for 'total_count'
      const estimatedTotalPages = Math.ceil(Math.min(result.data.total_count, 1000) / 10); // Assuming per_page = 10
      setTotalPages(estimatedTotalPages);
    } else {
      setError(result.error);
    }
    setLoading(false);
    setCurrentPage(page);
  };

  const loadMore = () => {
    if (currentPage < totalPages && !loading) {
      handleAdvancedSearch(currentSearchParams, currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">GitHub User Search</h1>
      <Search onAdvancedSearch={handleAdvancedSearch} />

      {loading && (currentPage === 1 ? <p className="text-center text-blue-600 text-lg mt-4">Loading...</p> : null)}
      {error && <p className="text-center text-red-600 text-lg mt-4">Looks like we can't find any users matching your criteria.</p>}

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
          {searchResults.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-24 h-24 rounded-full mb-4 ring-2 ring-blue-500"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.login}</h3>
              {/* Note: location, public_repos are not directly available in search results for each user, 
                  you'd need to fetch individual user data for that or rely on other means.
                  For this example, we'll display what's available directly in search results.
                  To get more details like location, you'd make another API call to 'https://api.github.com/users/{username}'
                  for each user, but that can quickly hit rate limits.
                  Let's assume for now we only display login and profile link from the search result.
                  If your objective implies getting more details per user from *search results*, GitHub's search API
                  doesn't return them by default. You'd typically only get a subset and then query individual user endpoints.
                  For the sake of this task, we will show what is directly available in `user` object from search.
              */}
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-medium mt-auto"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}

      {searchResults.length > 0 && !loading && currentPage < totalPages && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
          >
            Load More
          </button>
        </div>
      )}

      {searchResults.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 text-lg mt-8">Start by searching for GitHub users!</p>
      )}
    </div>
  );
}

export default App;