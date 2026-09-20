import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.RESEND_API_KEY) {
    console.error("⚠️ RESEND_API_KEY is missing in environment variables. Emails will not send.");
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const sendEmail = async ({ sendTo, subject, html }) => {
    if (!resend) {
        console.error("❌ Cannot send email: RESEND_API_KEY is not configured.");
        return null;
    }

    try {
        console.log(`\n📧 [EMAIL DISPATCH] To: ${sendTo} | Subject: ${subject}`);
        
        const fromAddress = process.env.RESEND_FROM_EMAIL || 'JP Store <no-reply@jpenterprise.store>';

        const { data, error } = await resend.emails.send({
            from: fromAddress,
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
