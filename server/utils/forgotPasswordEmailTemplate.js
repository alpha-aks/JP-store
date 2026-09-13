const forgotPasswordEmailTemplate = ({ name, otp }) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - JP Store</title>
    </head>
    <body style="margin: 0; padding: 25px 10px; background-color: #0c286e; font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; margin: 0 auto;">
            <tr>
                <td>
                    <!-- Traditional Jharokha Window Arch Outer Frame -->
                    <div style="background-color: #fffbf4; background: linear-gradient(180deg, #fffaf2 0%, #ffffff 50%, #fff7ed 100%); border-radius: 40px 40px 18px 18px; border: 3px solid #f59e0b; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.35); overflow: hidden;">
                        
                        <!-- Top Arch Crown & Heritage Slogan -->
                        <div style="background-color: #0c286e; padding: 14px 20px 10px 20px; text-align: center; border-bottom: 2px solid #f59e0b;">
                            <p style="margin: 0; color: #fef3c7; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">
                                ✦ શુદ્ધતા અને વિશ્વાસ • KEM CHO AHMEDABAD ✦
                            </p>
                            <h1 style="margin: 4px 0 0 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">
                                JP STORE
                            </h1>
                        </div>

                        <!-- Royal Banner / Artwork -->
                        <div style="padding: 12px 12px 0 12px; text-align: center;">
                            <img 
                                src="https://images.prismic.io/alphas/ZroTVnLBjkcTnobh_Banner-2.png?auto=format,compress" 
                                alt="JP Store Ahmedabad - Fresh Grocery Delivery" 
                                style="width: 100%; max-width: 530px; height: auto; border-radius: 26px 26px 12px 12px; border: 1px solid #fde68a; display: block; margin: 0 auto;"
                            />
                        </div>

                        <!-- Window Alcove Content Section -->
                        <div style="padding: 24px 28px; text-align: center;">
                            <!-- Traditional Ornamentation -->
                            <p style="margin: 0 0 6px 0; color: #d97706; font-size: 12px; font-weight: bold; letter-spacing: 1.5px;">
                                ✦ પાસવર્ડ પુનઃપ્રાપ્તિ • PASSWORD RECOVERY ✦
                            </p>
                            <h2 style="margin: 0 0 16px 0; color: #0c286e; font-size: 22px; font-weight: 800;">
                                Forgot Your Password?
                            </h2>

                            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 12px 0;">
                                Dear <strong>${name}</strong>,
                            </p>
                            <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0 auto 20px auto; max-width: 440px;">
                                We received a request to reset your password for your <strong>JP Store</strong> account. Please use the secure one-time verification code below:
                            </p>

                            <!-- Royal OTP Pedestal Box -->
                            <div style="margin: 25px 0;">
                                <div style="display: inline-block; background-color: #fff8eb; border: 2px dashed #f37023; border-radius: 14px; padding: 14px 36px; box-shadow: 0 4px 12px rgba(243, 112, 35, 0.15);">
                                    <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #b45309; font-weight: bold; letter-spacing: 2px;">
                                        One-Time Security Code
                                    </p>
                                    <span style="font-size: 32px; font-weight: 800; color: #0c286e; letter-spacing: 8px; font-family: monospace;">
                                        ${otp}
                                    </span>
                                </div>
                            </div>

                            <p style="font-size: 13px; color: #dc2626; font-weight: bold; margin: 16px 0 6px 0;">
                                ⏱ This OTP is valid for 10 minutes.
                            </p>
                            <p style="font-size: 12px; color: #6b7280; line-height: 1.5; margin: 0;">
                                If you did not request this password reset, please ignore this email or contact support immediately to secure your account.
                            </p>
                        </div>

                        <!-- Carved Pedestal Base (Window Sill Footer) -->
                        <div style="background-color: #fef3c7; background: linear-gradient(90deg, #fef3c7 0%, #ffedd5 50%, #fef3c7 100%); border-top: 2px solid #fcd34d; padding: 18px 20px; text-align: center;">
                            <p style="margin: 0 0 6px 0; font-size: 11px; color: #b45309; font-weight: bold; letter-spacing: 1px;">
                                ✦ તાજગી અને વિશ્વાસનું પ્રતીક ✦
                            </p>
                            <p style="margin: 6px 0 2px 0; font-size: 12px; color: #0c286e; font-weight: bold;">
                                With Warm Regards, <br>JP Store Team • Ahmedabad
                            </p>
                            <p style="margin: 8px 0 0 0; font-size: 10px; color: #9ca3af;">
                                © ${new Date().getFullYear()} JP Store. All rights reserved.
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

export default forgotPasswordEmailTemplate;
