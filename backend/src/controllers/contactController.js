import Contact from "../models/contactModel.js";

// Create new contact
export const createContact = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      company,
      jobTitle,
      website,
      alternatePhone,
      birthday,
      notes,
      tags,
      address,
      social,
    } = req.body;

    // ✅ Parse nested objects (important)
    if (typeof address === "string") address = JSON.parse(address);
    if (typeof social === "string") social = JSON.parse(social);

    // ✅ Tags convert to array
    const tagsArray = tags ? tags.split(",").map((t) => t.trim()) : [];

    // ✅ Cloudinary photo url
    const photo = req.file?.path || "";

    const newContact = await Contact.create({
      user: req.user._id,
      name,
      email,
      phone,
      company,
      jobTitle,
      website,
      alternatePhone,
      birthday,
      notes,
      tags: tagsArray,
      address,
      social,
      photo,
    });

    res.status(201).json({
      success: true,
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all contacts for a user
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single contact
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.user._id });
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update contact
export const updateContact = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file?.path) updateData.photo = req.file.path;

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    );

    if (!updatedContact) return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
