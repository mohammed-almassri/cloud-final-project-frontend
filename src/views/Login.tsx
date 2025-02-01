import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

import { useState } from "react";
import APIError from "../errors/APIError";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login({ email, password });
      console.log("Logged in successfully");
    } catch (err) {
      if (err instanceof APIError) {
        setError(err.message);
      } else {
        setError(
          "Failed to login. Please check your credentials and try again."
        );
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
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <div className="mb-4">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-200 rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-200 rounded"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      <Link to="/register" className="block mt-4 text-blue-900">
        Don't have an account? <span className="underline">Register</span>
      </Link>
    </form>
  );
}
