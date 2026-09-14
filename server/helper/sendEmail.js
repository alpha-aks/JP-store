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
        
        const configuredFrom = process.env.RESEND_FROM_EMAIL;
        const primaryFrom = configuredFrom || 'Jp Store <support@jpenterprise.store>';
        const verifiedFallbackFrom = 'Jp Store <no-reply@nishant.one>';

        let result = await resend.emails.send({
            from: primaryFrom,
            to: sendTo,
            subject: subject,
            html: html,
        });

        // If domain is not verified on Resend yet, failover to verified domain so mails are never blocked
        if (result.error && (result.error.message?.includes("not verified") || result.error.statusCode === 403)) {
            console.warn(`⚠️ Sender "${primaryFrom}" not verified on Resend yet. Automatically falling back to verified domain "${verifiedFallbackFrom}"...`);
            result = await resend.emails.send({
                from: verifiedFallbackFrom,
                to: sendTo,
                subject: subject,
                html: html,
            });
        }

        if (result.error) {
            console.error("❌ Resend error:", result.error);
            return null;
        }

        console.log("✅ Email sent successfully via Resend. ID:", result.data?.id);
        return result.data;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return null;
    }
};

export default sendEmail;
