import * as z from "zod";

export const LoginSchema = z.object({
   email: z.string().email({
      message: "Adresse courriel requis",
   }),
   password: z.string().min(1, {
      message: "Mot de passe requis",
   }),
});

export const RegisterSchema = z.object({
   email: z.string().email({
      message: "Adresse courriel requis",
   }),
   password: z.string().min(6, {
      message: "6 caractères minimum requis",
   }),
   name: z.string().min(1, {
      message: "Nom requis",
   }),
});
