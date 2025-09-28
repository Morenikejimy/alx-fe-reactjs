function UserList({ users }) {
  if (!users || users.length === 0) {
    return <p className="text-center mt-6 text-gray-600">No users found.</p>;
  }

  return (
    <div className="grid gap-4 mt-6 max-w-4xl mx-auto">
      {users.map((user) => (
        <div
          key={user.id}
          className="p-4 border rounded-lg flex items-center gap-4 bg-white shadow"
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.login}</h3>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
