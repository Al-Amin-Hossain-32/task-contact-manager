import React, { useState, useEffect } from "react";
import API from "../../api/axios"; 
import ContactList from "./ContactList";
import ContactModal from "./ContactModal";
import DashboardLayout from "../../layout/DashboardLayout";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

 const fetchContacts = async () => {
  try {
    const res = await API.get("/contacts"); // use API instance
    setContacts(res.data);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    fetchContacts();
  }, []);
const handleSave = async (contactData) => {
  try {
    const formData = new FormData();
    Object.keys(contactData).forEach((key) => {
      if (contactData[key] !== null) formData.append(key, contactData[key]);
    });

    if (editingContact) {
      // PUT /api/contacts/:id
      await API.put(`/contacts/${editingContact._id}`, formData);
    } else {
      // POST /api/contacts
      await API.post("/contacts", formData);
    }

    setIsModalOpen(false);
    setEditingContact(null);
    fetchContacts();
  } catch (err) {
    console.error(err);
  }
};

const handleDelete = async (id) => {
  try {
    await API.delete(`/contacts/${id}`);
    fetchContacts();
  } catch (err) {
    console.error(err);
  }
};

  
  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Contacts</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Contact
        </button>
      </div>

      <ContactList contacts={contacts} onEdit={handleEdit} onDelete={handleDelete} />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSave}
        initialData={editingContact}
      />
    </div>
    </DashboardLayout>
  );
};

export default Contacts;
