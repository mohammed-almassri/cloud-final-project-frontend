import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-lg mx-auto sm:h-screen text-center sm:text-start">
        <div className="flex flex-col justify-center items-center mt-10 sm:mt-0">
          <img
            src={user?.profileImage || "/no-image.png"}
            alt="avatar"
            className="w-24 h-24 sm:w-48 sm:h-48 rounded-md inline"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>
          <p className="mt-2 text-2xl">Email: {user?.email}</p>
        </div>
      </div>
      <button
        onClick={() => logout()}
        className="mt-4 px-4 py-2  text-gray-400 underline rounded fixed bottom-2 right-2"
      >
        Logout
      </button>
    </>
  );
}
