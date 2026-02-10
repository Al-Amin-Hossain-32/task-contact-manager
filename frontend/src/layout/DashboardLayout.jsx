import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
