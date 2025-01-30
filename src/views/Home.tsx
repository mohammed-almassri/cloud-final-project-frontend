import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div className="p-4">
      <img
        src={user?.profileImage || "/no-image.png"}
        alt="avatar"
        className="w-24 h-24 rounded-full"
      />
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <p className="mt-2 text-lg">Email: {user?.email}</p>

      <button
        onClick={() => logout()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
