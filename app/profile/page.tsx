const Profile = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-24">
      <div className="bg-gray-200 h-60 rounded-lg mb-6"></div>
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
        <div className="ml-8">
          {/* Display user information */}
          {/* You can fetch and display user data dynamically */}
          <h1 className="text-4xl font-bold">User Name</h1>
          <p className="text-gray-600">Email: user@example.com</p>
          <p className="text-gray-600">Location: City, Country</p>
          {/* Add other user profile information */}
        </div>
      </div>
      <div className="mb-8">
        {/* Display user bio */}
        <p className="text-gray-800 text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
          consectetur elit. Curabitur vel neque nec velit volutpat tristique.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
          ducimus ullam ipsum sunt optio incidunt ipsam rerum rem ratione
          aliquam, temporibus provident accusantium consequuntur molestias
          adipisci quaerat, itaque dolores laudantium! Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Ab quae veritatis, asperiores autem
          ipsum
        </p>
      </div>
      {/* Add more sections for user activity, posts, friends, etc. */}
    </div>
  );
};
export default Profile;
