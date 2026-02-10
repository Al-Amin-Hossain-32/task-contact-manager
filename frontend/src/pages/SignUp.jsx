import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react"; // আইকনের জন্য

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return setError("Please fill all fields!");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      setLoading(true);
      setError(null);

      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setLoading(false);
      navigate("/login", { state: { message: "Account created! Please login." } });
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-8 rounded-[2rem] w-full max-w-md shadow-2xl z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-blue-600/10 rounded-2xl text-blue-500 mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
          <p className="text-gray-400 mt-2">Join us to manage your tasks efficiently</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                Sign Up <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;