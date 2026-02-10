import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="h-16 bg-gray-800 flex items-center justify-between px-4 md:px-6 border-b border-gray-700">
      <h1 className="text-lg font-semibold text-white">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          {user?.name || "User"}
        </span>

        <button
          onClick={() => dispatch(logout())}
          className="bg-red-500 px-4 py-1 rounded-lg text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
