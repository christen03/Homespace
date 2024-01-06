import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as sgMail from "@sendgrid/mail"; // Import SendGrid library
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!); // Set SendGrid API key

export const sendEmailRouter = createTRPCRouter({
  // ... other routes

  sendEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mailOptions = {
        to: input.email,
        from: "spacelikehome.contact@gmail.com", // Replace with verified sender
        subject: "Thank you for joining the Homespace waitlist!",
        html: `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: sans-serif;
    }
    h1 {
      color: #333;
      font-size: 24px;
      margin-top: 0;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
    }
    .button {
      background-color: #007bff;
      border: none;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <h1>Welcome to the Homespace waitlist!</h1>
  <p>Hi pookie,</p>
  <p>We're so thrilled you're interested in Homespace! Thanks for signing up to be one of the first to know when we launch.</p>
  <p>We're working hard to create a unique and seamless experience for finding your perfect sublease, and we can't wait to share it with you soon. Get excited to have a consolidated place for subleases!</p>
  <p>In the meantime, stay tuned for updates and exclusive offers by following us on social media:</p>
  <ul>
    <li><a href="https://www.linkedin.com/company/spacelikehome/">LinkedIn</a></li>
    <li><a href="https://www.instagram.com/spacelikehome">Instagram</a></li>
  </ul>
  <p>We'll be in touch soon with more exciting news!</p>
  <p>Sincerely,<br>Your Homespace Team <br><a href="https://www.spacelikehome.com">spacelikehome.com</a></p>
  </body></html>`,
      };

      try {
        await sgMail.send(mailOptions); // Send using SendGrid
        return { message: "Email sent successfully" };
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email"); // Handle the error appropriately
      }
    }),
});

export type sendEmailRouter = typeof sendEmailRouter;
