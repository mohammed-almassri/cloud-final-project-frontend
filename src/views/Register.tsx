import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import APIError from "../errors/APIError";

export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const base64Image = e.target!.result; // This gives you the base64 string
        // Send this to your API
        setImage(base64Image as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        image64: image,
      });
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);
      } else {
        setError("Failed to register. Please check the details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
          placeholder="Password"
        />
      </div>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Register"}
      </button>
      <Link to="/login" className="block mt-4 text-blue-900">
        Already have an account? <span className="underline">Login</span>
      </Link>
    </form>
  );
}
