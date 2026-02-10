import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  addTask,
  deleteTask,
  updateTask,
} from "../redux/slices/TaskSlice";
import DashboardLayout from "../layout/DashboardLayout";
import { 
  Plus, Calendar, Flag, CheckCircle, Clock, Trash2, Edit3, ChevronDown, X 
} from "lucide-react"; // npm install lucide-react

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAdd = () => {
    if (!title || !desc || !deadline) return alert("Please fill all fields!");
    dispatch(
      addTask({ title, description: desc, status, priority, deadline }),
    ).then(() => {
      dispatch(fetchTasks());
      setOpen(false); // Close accordion after adding
    });

    setTitle(""); setDesc(""); setStatus("Pending"); setPriority("Medium"); setDeadline("");
  };

  const getStatusBadge = (status) => {
    const styles = {
      Completed: "bg-green-500/10 text-green-400 border-green-500/20",
      Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    };
    return `px-2 py-1 text-xs font-medium border rounded-full ${styles[status] || "bg-gray-500/10 text-gray-400"}`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "text-red-400";
      case "Medium": return "text-blue-400";
      case "Low": return "text-emerald-400";
      default: return "text-gray-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">My Tasks</h2>
          <p className="text-gray-400 text-sm">Manage your daily workflow effectively</p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          {open ? <X size={18} /> : <Plus size={18} />}
          {open ? "Close" : "New Task"}
        </button>
      </div>

      {/* Animated Add Task Form */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[500px] mb-8" : "max-h-0"}`}>
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl backdrop-blur-sm shadow-xl space-y-4">
          <input
            className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            placeholder="Task description..."
            rows="2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Pending</option>
              <option>Completed</option>
            </select>
            <select className="p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input
              type="date"
              className="p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-95">
              Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div></div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/20 rounded-3xl border border-dashed border-gray-700">
          <p className="text-gray-500">No tasks found. Start by adding one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="group bg-gray-800/40 border border-gray-700/50 p-5 rounded-2xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={getStatusBadge(task.status)}>{task.status}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingTask(task)} className="p-2 hover:bg-gray-700 rounded-lg text-blue-400 transition-colors"><Edit3 size={16} /></button>
                  <button onClick={() => dispatch(deleteTask(task._id)).then(() => dispatch(fetchTasks()))} className="p-2 hover:bg-gray-700 rounded-lg text-red-400 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{task.title}</h3>
              <p className="text-gray-400 text-sm mb-5 line-clamp-2 leading-relaxed">{task.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Flag size={14} className={getPriorityColor(task.priority)} />
                  <span className={getPriorityColor(task.priority)}>{task.priority.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Clock size={14} />
                  <span>{new Date(task.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-3xl w-full max-w-md shadow-2xl scale-in-center">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Edit3 size={24} className="text-blue-500" /> Edit Task
            </h2>

            <div className="space-y-4">
              <input
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={editingTask.title}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
              />
              <textarea
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                rows="3"
                value={editingTask.description}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <select className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white" value={editingTask.status} onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}>
                  <option>Pending</option>
                  <option>Completed</option>
                </select>
                <select className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white" value={editingTask.priority} onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <input
                type="date"
                className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
                value={editingTask.deadline.slice(0, 10)}
                onChange={(e) => setEditingTask({ ...editingTask, deadline: e.target.value })}
              />
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition" onClick={() => setEditingTask(null)}>Cancel</button>
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-blue-600/20"
                onClick={() => {
                  dispatch(updateTask({ id: editingTask._id, updatedTask: editingTask }))
                  .then(() => { dispatch(fetchTasks()); setEditingTask(null); });
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Tasks;