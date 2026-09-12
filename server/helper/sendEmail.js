import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing in .env file");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        console.log(`\n📧 [EMAIL DISPATCH] To: ${sendTo} | Subject: ${subject}`);
        const { data, error } = await resend.emails.send({
            from: 'Jp Store <no-reply@nishant.one>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            console.error("❌ Resend error:", error);
            return null;
        }

        console.log("✅ Email sent successfully via Resend. ID:", data?.id);
        return data;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return null;
    }
};

export default sendEmail;
