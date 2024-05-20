"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>) => {
   const validatedFields = LoginSchema.safeParse(values);

   if (!validatedFields.success) {
      return { error: "Champs invalides!" };
   }

   const { email, password } = validatedFields.data;

   const existingUser = await getUserByEmail(email);

   if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Votre courriel n'existe pas!" };
   }

   if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
         existingUser.email
      );

      await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token
      );

      return { success: "Courriel de confirmation envoyé!" };
   }

   try {
      await signIn("credentials", {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT,
      });
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return { error: "Adresse courriel ou mot de passe invalide!" };
            default:
               return { error: "Une erreur s'est produite!" };
         }
      }

      throw error;
   }
};
