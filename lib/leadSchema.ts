import { z } from "zod";

export const leadSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  elementName: z.string().min(1, { message: "Nom d'élément manquant" }),
});

export type LeadData = z.infer<typeof leadSchema>;