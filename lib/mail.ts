import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
   await resend.emails.send({
      from: "My app <onboarding@resend.dev>",
      to: email,
      subject: "My app - 2FA Code",
      html: `
        <p>Voici votre 2FA code: ${token}</p>
        <br>
        <p>Merci d'avoir visité <a href="/">My app</a></p>`,
   });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
   const resetLink = `${domain}/auth/new-password?token=${token}`;

   await resend.emails.send({
      from: "My app <onboarding@resend.dev>",
      to: email,
      subject: "My app - Réinitialiser votre mot de passe",
      html: `
        <p>Cliquez <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe.</p>
        <br>
        <p>Merci d'avoir visité <a href="/">My app</a></p>`,
   });
};

export const sendVerificationEmail = async (email: string, token: string) => {
   const confirmLink = `${domain}/auth/new-verification?token=${token}`;

   await resend.emails.send({
      from: "My app <onboarding@resend.dev>",
      to: email,
      subject: "My app - Confirmez votre emai",
      html: `
        <h1>My app vous souhaite la bienvenue</h1>
        <h2>Vous devez d'abord confirmer votre email pour utiliser My app.</h2>
        <h3>Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre email.</h3>
        <br>
        <p>Merci d'avoir visité <a href="/">My app</a></p>`,
   });
};
