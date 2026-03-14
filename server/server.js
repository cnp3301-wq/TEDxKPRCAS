import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure Nodemailer transporter with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.VITE_APP_EMAIL,
    pass: process.env.VITE_APP_PASSWORD,
  },
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Email server is running" });
});

// Send Email Endpoint
app.post("/api/send-email", async (req, res) => {
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
      text: text || html.replace(/<[^>]*>/g, ""), // Plain text fallback
      html: html,
    });

    console.log(`✅ Email sent successfully to: ${to}`);
    console.log(`Message ID: ${info.messageId}`);

    res.json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({
      error: "Failed to send email",
      message: error.message || "Unknown error",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Email server running on http://localhost:${PORT}`);
  console.log(`📧 SMTP configured with: ${process.env.VITE_APP_EMAIL}`);
  console.log(`\nEndpoints:`);
  console.log(`  GET  /health         - Health check`);
  console.log(`  POST /api/send-email - Send email\n`);
});
