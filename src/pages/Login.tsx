import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Logged in successfully!");
      // Redirect or update UI here after login
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert("✅ Logged in with Google!");
      // Redirect or update UI here after login
    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr className="my-6" />

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full  text-black py-3 rounded-xl hover:bg-red-200 transition-all flex items-center justify-center gap-2"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 533.5 544.3"
          >
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.8-1.5-35-4.5-51.7H272v97.9h147.4c-6.4 34.4-26.1 63.6-55.9 83.2v68h90.2c52.8-48.7 83.8-120.3 83.8-197.4z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c75.7 0 139.5-25.1 186-68.3l-90.2-68c-25 16.8-57 26.6-95.8 26.6-73.7 0-136.2-49.8-158.6-116.8H19.5v73.4c46.3 91.1 140.8 153.1 252.5 153.1z"
            />
            <path
              fill="#fbbc04"
              d="M113.4 323.8c-9.8-29-9.8-60.3 0-89.3v-73.4H19.5c-39.6 78.7-39.6 171.6 0 250.3l93.9-73.6z"
            />
            <path
              fill="#ea4335"
              d="M272 107.7c40.7 0 77.3 14 106.1 41.4l79.3-79.3C402.8 24 341.8 0 272 0 160.3 0 65.8 61.9 19.5 153l93.9 73.4c22.4-67 84.9-116.8 158.6-116.8z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
