import React from "react";
import { FaPhone, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 flex flex-col items-center md:items-start md:flex-row md:space-x-4 w-full max-w-md mx-auto mb-4">
      {/* Photo */}
      <div className="flex-shrink-0">
        <img
          src={contact.photo || "/default-avatar.png"}
          alt={contact.name}
          className="w-28 h-28 rounded-full object-cover border-2 border-blue-500 shadow-md"
        />
      </div>

      {/* Info */}
      <div className="flex-1 mt-3 md:mt-0 text-center md:text-left">
        {/* Name */}
        <h2 className="text-xl font-bold">{contact.name}</h2>

        {/* Phone */}
        {contact.phone && (
          <p className="flex items-center justify-center md:justify-start text-blue-300 mt-1 cursor-pointer hover:text-blue-400">
            <FaPhone className="mr-2" />
            <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          </p>
        )}

        {/* Email */}
        {contact.email && (
          <p className="flex items-center justify-center md:justify-start text-gray-300 mt-1">
            <FaEnvelope className="mr-2" />
            {contact.email}
          </p>
        )}

        {/* Job & Company */}
        {(contact.jobTitle || contact.company) && (
          <p className="text-gray-400 text-sm mt-1">
            {contact.jobTitle} {contact.jobTitle && contact.company ? "|" : ""} {contact.company}
          </p>
        )}

        {/* Tags */}
        <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
          {contact.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-500 bg-opacity-20 text-blue-400 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex mt-3 md:mt-0 space-x-3 md:flex-col md:space-x-0 md:space-y-2">
        <button
          onClick={() => onEdit(contact)}
          className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-full text-white shadow-md"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(contact._id)}
          className="bg-red-500 hover:bg-red-600 p-2 rounded-full text-white shadow-md"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
