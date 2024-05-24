"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
   const user = await currentUser();

   if (!user) {
      return { error: "Non authorisé" };
   }

   const dbUser = await getUserById(user.id as string);

   if (!dbUser) {
      return { error: "Non authorisé" };
   }

   if (user.isOAuth) {
      values.email = undefined;
      values.password = undefined;
      values.newPassword = undefined;
      values.isTwoFactorEnabled = undefined;
   }

   if (values.email && values.email !== user.email) {
      const existingUser = await getUserByEmail(values.email);

      if (existingUser && existingUser.id !== user.id) {
         return { error: "Cet email est déjà utilisé!" };
      }

      const verificationToken = await generateVerificationToken(values.email);
      await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token
      );

      return { success: "Email de confirmation envoyé!" };
   }

   if (values.password && values.newPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
         values.password,
         dbUser.password
      );

      if (!passwordsMatch) {
         return { error: "Mot de passe actuel invalide!" };
      }

      const hashedPassword = await bcrypt.hash(values.newPassword, 6);
      values.password = hashedPassword;
      values.newPassword = undefined;
   }

   const updatedUser = await db.user.update({
      where: { id: dbUser.id },
      data: {
         ...values,
      },
   });

   return { success: "Vos informations ont été mises à jour!" };
};
