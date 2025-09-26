 function UserProfile() {
 
    return (
    <div className="bg-gray-100 p-8 max-w-sm sm:max-w-sm md:max-w-md mx-auto my-20 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
      <img
        src="https://via.placeholder.com/150"
        alt="User"
        className="rounded-full w-36 h-36 mx-auto"
      />
      <h1 className="text-xl sm:text-xl md:text-2xl text-blue-800 my-4">John Doe</h1>
      <p className="text-sm sm:text-base text-gray-600 text-center">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}

export default UserProfile;
