import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
   const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

   await resend.emails.send({
      from: "SHT Lab <onboarding@resend.dev>",
      to: email,
      subject: "SHT lab - Confirmez votre courriel",
      html: `
        <h1>SHT Lab vous souhaite bienvenue</h1>
        <h2>Vous devez d'abord confirmer votre courriel pour utiliser ce site.</h2>
        <h3>Cliquez <a href="${confirmLink}">ici</a> pour confirmer votre courriel.</h3>
        <br>
        <p>Merci d'avoir visité <a href="http://shtlab.ca">shtlab.ca</a></p>`,
   });
};
