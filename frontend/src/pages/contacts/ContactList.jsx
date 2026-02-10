import React from "react";
import ContactCard from "./ContactCard";

const ContactList = ({ contacts, onEdit, onDelete }) => {
  // Ensure contacts is always an array
  const contactArray = Array.isArray(contacts) ? contacts : [];

  if (contactArray.length === 0) {
    return <p className="text-gray-500 text-center">No contacts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {contactArray.map((contact) => (
        <ContactCard
          key={contact._id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;
