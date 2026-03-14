import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.VITE_APP_EMAIL,
    pass: process.env.VITE_APP_PASSWORD,
  },
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, subject, html, text } = req.body;

    // Validate required fields
    if (!to || !subject || !html) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "Required: to, subject, html",
      });
    }

    console.log(`📧 Sending email to: ${to}`);

    // Send email
    const info = await transporter.sendMail({
      from: `"TEDx KPRCAS" <${process.env.VITE_APP_EMAIL}>`,
      to: to,
      subject: subject,
      text: text || html.replace(/<[^>]*>/g, ""),
      html: html,
    });

    console.log(`✅ Email sent successfully to: ${to}`);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Email error:", error);
    return res.status(500).json({
      error: "Failed to send email",
      message: error.message || "Unknown error",
    });
  }
}
