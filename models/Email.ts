import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});
const Email = mongoose.models.Email || mongoose.model("Email", EmailSchema);
export default Email;

