import { useState } from "react";
import Search from "./components/ Search";
import UserList from "./components/ UserList";
import { searchUsers } from "./services/ githubService";

import Search from "./components/Search";


function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    const data = await searchUsers(filters);
    setUsers(data.items || []);
    setLoading(false);

  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Search onSearch={handleSearch} />
      {loading ? (
        <p className="text-center mt-6">Loading...</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}

export default App;