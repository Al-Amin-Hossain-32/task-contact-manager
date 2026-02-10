import React, { useState, useEffect } from "react";
import { X, Upload, User, Mail, Phone, Briefcase, Globe, Calendar, Tag, FileText } from "lucide-react"; // Lucide icons ব্যবহার করলে আরও সুন্দর দেখাবে

const ContactModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    website: "",
    birthday: "",
    notes: "",
    tags: "",
    photo: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
        photo: null,
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="p-2 bg-blue-600/20 text-blue-500 rounded-lg">
              {initialData ? <FileText size={20} /> : <User size={20} />}
            </span>
            {initialData ? "Edit Contact" : "Create New Contact"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* Photo Upload Section */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl p-4 bg-gray-800/30 hover:bg-gray-800/50 transition-all group">
            <label className="cursor-pointer flex flex-col items-center w-full">
              <Upload className="text-gray-500 group-hover:text-blue-500 mb-2 transition-colors" />
              <span className="text-sm text-gray-400">
                {form.photo ? form.photo.name : "Click to upload contact photo"}
              </span>
              <input type="file" name="photo" onChange={handleChange} className="hidden" accept="image/*" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Fields */}
            {[
              { label: "Full Name", name: "name", type: "text", icon: <User size={16}/>, placeholder: "John Doe", required: true },
              { label: "Email Address", name: "email", type: "email", icon: <Mail size={16}/>, placeholder: "john@example.com" },
              { label: "Phone Number", name: "phone", type: "text", icon: <Phone size={16}/>, placeholder: "+880..." },
              { label: "Company", name: "company", type: "text", icon: <Briefcase size={16}/>, placeholder: "Google Inc." },
              { label: "Job Title", name: "jobTitle", type: "text", icon: <Briefcase size={16}/>, placeholder: "Software Engineer" },
              { label: "Website", name: "website", type: "url", icon: <Globe size={16}/>, placeholder: "https://..." },
              { label: "Birthday", name: "birthday", type: "date", icon: <Calendar size={16}/> },
              { label: "Tags", name: "tags", type: "text", icon: <Tag size={16}/>, placeholder: "Family, Work..." },
            ].map((field) => (
              <div key={field.name} className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">{field.label}</label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    {field.icon}
                  </div>
                  <input
                    {...field}
                    value={form[field.name]}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Notes - Full Width */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Notes</label>
            <textarea
              name="notes"
              placeholder="Add some details about this contact..."
              value={form.notes}
              onChange={handleChange}
              rows="3"
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
            />
          </div>
        </form>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 rounded-xl font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
          >
            {initialData ? "Update Contact" : "Save Contact"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default ContactModal;