import * as z from "zod";

export const NewPasswordSchema = z.object({
   password: z.string().min(6, {
      message: "6 caractères minimum requis",
   }),
});

export const ResetSchema = z.object({
   email: z.string().email({
      message: "Adresse email requis",
   }),
});

export const LoginSchema = z.object({
   email: z.string().email({
      message: "Adresse email requis",
   }),
   password: z.string().min(1, {
      message: "Mot de passe requis",
   }),
   code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
   email: z.string().email({
      message: "Adresse email requis",
   }),
   password: z.string().min(6, {
      message: "Six caractères minimum requis",
   }),
   name: z.string().min(1, {
      message: "Nom requis",
   }),
});
