 const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    photo: { type: String, default: "" },
    company: { type: String },
    jobTitle: { type: String },
    website: { type: String },
    address: {
      street: String,
      village: String,
      thana: String,
      district: String,
      division: String,
    },
    social: {
      facebook: String,
      linkedin: String,
      instagram: String,
    },
    alternatePhone: String,
    birthday: Date,
    notes: String,
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
