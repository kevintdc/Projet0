import nodemailer from "nodemailer";

const verifyCaptcha = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET;
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secret}&response=${token}`,
    }
  );

  return response.json();
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { name, email, message, token } = req.body;

  if (!name || !email || !message || !token) {
    return res.status(400).json({ message: "Champs manquants ou invalides" });
  }

  const captcha = await verifyCaptcha(token);

  if (!captcha.success || captcha.score < 0.5) {
    return res.status(400).json({ message: "Échec du CAPTCHA — Bot suspecté" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Toudic Development" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `📬 Nouveau message de ${name}`,
      html: `
        <h3>Nom :</h3><p>${name}</p>
        <h3>Email :</h3><p>${email}</p>
        <h3>Message :</h3><p>${message}</p>
      `,
    });

    return res.status(200).json({ message: "Message envoyé avec succès ✅" });
  } catch (error) {
    console.error("Erreur dans l’envoi de l’email :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de l’envoi du message." });
  }
}
