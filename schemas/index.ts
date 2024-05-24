import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
   .object({
      name: z.optional(
         z.string().min(3, {
            message: "Au moins trois caractères requis",
         })
      ),
      email: z.optional(
         z.string().email({
            message: "Adresse email valide requise",
         })
      ),
      password: z.optional(
         z.string().min(6, {
            message: "Six caractères minimum requis",
         })
      ),
      newPassword: z.optional(
         z.string().min(6, {
            message: "Six caractères minimum requis",
         })
      ),
      role: z.enum([UserRole.ADMIN, UserRole.USER]),
      isTwoFactorEnabled: z.optional(z.boolean()),
   })
   .refine(
      (data) => {
         if (data.password && !data.newPassword) {
            return false;
         }

         return true;
      },
      {
         message: "Un nouveau mot de passe est requis",
         path: ["newPassword"],
      }
   )
   .refine(
      (data) => {
         if (data.newPassword && !data.password) {
            return false;
         }

         return true;
      },
      {
         message: "Mot de passe actuel requis",
         path: ["password"],
      }
   );

export const NewPasswordSchema = z.object({
   password: z.string().min(6, {
      message: "Six caractères minimum requis",
   }),
});

export const ResetSchema = z.object({
   email: z.string().email({
      message: "Adresse email valide requise",
   }),
});

export const LoginSchema = z.object({
   email: z.string().email({
      message: "Adresse email valide requise",
   }),
   password: z.string().min(1, {
      message: "Mot de passe requis",
   }),
   code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
   email: z.string().email({
      message: "Adresse email valide requise",
   }),
   password: z.string().min(6, {
      message: "Six caractères minimum requis",
   }),
   name: z.string().min(1, {
      message: "Nom requis",
   }),
});
