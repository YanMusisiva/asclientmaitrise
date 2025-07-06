import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IClickLead extends Document {
  email: string;
  elementName: string;
  createdAt: Date;
}

const ClickLeadSchema = new Schema<IClickLead>(
  {
    email: { type: String, required: true },
    elementName: { type: String, required: true },
  },
  { timestamps: true } // ajoute automatiquement createdAt et updatedAt
);

// Pour éviter le modèle déjà compilé lors de l'utilisation avec Next.js
export default models.ClickLead || model<IClickLead>("ClickLead", ClickLeadSchema);