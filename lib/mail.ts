import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
   await resend.emails.send({
      from: "SHT Lab <onboarding@resend.dev>",
      to: email,
      subject: "SHT lab - 2FA Code",
      html: `
        <p>Voici votre 2FA code: ${token}</p>
        <br>
        <p>Merci d'avoir visité <a href="http://shtlab.ca">shtlab.ca</a></p>`,
   });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
   const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

   await resend.emails.send({
      from: "SHT Lab <onboarding@resend.dev>",
      to: email,
      subject: "SHT lab - Réinitialiser votre mot de passe",
      html: `
        <p>Cliquez <a href="${resetLink}">ici</a> pour réinitialiser votre mot de passe.</p>
        <br>
        <p>Merci d'avoir visité <a href="http://shtlab.ca">shtlab.ca</a></p>`,
   });
};

export const sendVerificationEmail = async (email: string, token: string) => {
   const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

   await resend.emails.send({
      from: "SHT Lab <onboarding@resend.dev>",
      to: email,
      subject: "SHT lab - Confirmez votre emai",
      html: `
        <h1>SHT Lab vous souhaite bienvenue</h1>
        <h2>Vous devez d'abord confirmer votre email pour utiliser SHT Lab.</h2>
        <h3>Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre email.</h3>
        <br>
        <p>Merci d'avoir visité <a href="http://shtlab.ca">shtlab.ca</a></p>`,
   });
};
