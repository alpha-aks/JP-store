const deliveryOtpEmailTemplate = ({ customerName, orderId, otp, totalAmt }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Out for Delivery - JP Store</title>
    </head>
    <body style="margin: 0; padding: 30px 10px; background-color: #0c286e; background-image: url('https://images.prismic.io/alphas/ONThie_S2o_hs8SH_bg.jpg?auto=format,compress'); background-size: cover; background-position: center top; background-repeat: no-repeat; font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;">
        
        <!-- Elevated White Canvas Container -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4); overflow: hidden;">
            <tr>
                <td style="padding: 16px; background-color: #ffffff;">
                    
                    <!-- Traditional Jharokha Arched Window Frame -->
                    <div style="background-color: #fffbf4; background: linear-gradient(180deg, #fffaf2 0%, #ffffff 50%, #fff7ed 100%); border-radius: 36px 36px 16px 16px; border: 2.5px solid #f59e0b; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2); overflow: hidden;">
                        
                        <!-- Top Arch Crown & Heritage Slogan -->
                        <div style="background-color: #0c286e; padding: 14px 20px 10px 20px; text-align: center; border-bottom: 2px solid #f59e0b;">
                            <p style="margin: 0; color: #fef3c7; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">
                                ✦ શુદ્ધતા અને વિશ્વાસ • KEM CHO GUNDALA ✦
                            </p>
                            <h1 style="margin: 4px 0 0 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 1px;">
                                JP STORE
                            </h1>
                        </div>

                        <!-- Gundala Banner inside Window Arch -->
                        <div style="padding: 10px 10px 0 10px; text-align: center;">
                            <img 
                                src="https://images.prismic.io/alphas/uTPvIWxZAYxoWQ6u_Banner-2.png?auto=format,compress" 
                                alt="Kem Cho Gundala - JP Store" 
                                style="width: 100%; max-width: 540px; height: auto; border-radius: 24px 24px 8px 8px; border: 1px solid #fde68a; display: block; margin: 0 auto;"
                            />
                        </div>

                        <!-- Palace Window Alcove Content Section -->
                        <div style="padding: 24px 24px; text-align: center;">
                            <p style="margin: 0 0 6px 0; color: #038C1F; font-size: 12px; font-weight: bold; letter-spacing: 1.5px;">
                                ✦ ડિલિવરી સુરક્ષા કોડ • DELIVERY CONFIRMATION OTP ✦
                            </p>
                            <h2 style="margin: 0 0 16px 0; color: #0c286e; font-size: 22px; font-weight: 800;">
                                Your Order is Arriving!
                            </h2>

                            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 8px 0;">
                                Hello <strong>${customerName}</strong>,
                            </p>
                            <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0 auto 16px auto; max-width: 480px;">
                                Great news! Your order <strong>#${orderId}</strong>${totalAmt ? ` (Total: ₹${totalAmt})` : ''} is ready for delivery.
                            </p>

                            <!-- Security Instruction Alert -->
                            <div style="background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 12px 16px; margin: 16px auto; max-width: 460px; text-align: left;">
                                <p style="margin: 0; color: #166534; font-size: 13px; line-height: 1.5;">
                                    🛡️ <strong>Delivery Verification:</strong> Please share this 6-digit OTP with your delivery agent only after you receive and inspect your package.
                                </p>
                            </div>

                            <!-- Royal OTP Pedestal Box -->
                            <div style="margin: 24px 0;">
                                <div style="display: inline-block; background-color: #fff8eb; border: 2.5px dashed #038C1F; border-radius: 14px; padding: 14px 36px; box-shadow: 0 4px 14px rgba(3, 140, 31, 0.2);">
                                    <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #166534; font-weight: bold; letter-spacing: 2px;">
                                        Delivery Verification Code
                                    </p>
                                    <span style="font-size: 32px; font-weight: 800; color: #0c286e; letter-spacing: 8px; font-family: monospace;">
                                        ${otp}
                                    </span>
                                </div>
                            </div>

                            <p style="font-size: 13px; color: #dc2626; font-weight: bold; margin: 16px 0 6px 0;">
                                ⏱ This code is valid for the next 30 minutes.
                            </p>
                            <p style="font-size: 12px; color: #6b7280; line-height: 1.5; margin: 0 auto; max-width: 440px;">
                                Do not share this OTP with anyone over phone or messaging apps until the delivery person arrives at your doorstep.
                            </p>
                        </div>

                        <!-- Traditional Window Sill Pedestal Base -->
                        <div style="background-color: #fef3c7; background: linear-gradient(90deg, #fef3c7 0%, #ffedd5 50%, #fef3c7 100%); border-top: 2px solid #fcd34d; padding: 18px 20px; text-align: center;">
                            <p style="margin: 0 0 6px 0; font-size: 11px; color: #b45309; font-weight: bold; letter-spacing: 1px;">
                                ✦ તાજગી અને વિશ્વાસનું પ્રતીક ✦
                            </p>
                            <p style="margin: 6px 0 2px 0; font-size: 12px; color: #0c286e; font-weight: bold;">
                                With Warm Regards, <br>JP Store Team
                            </p>
                            <p style="margin: 3px 0 0 0; font-size: 11px; color: #6b7280; line-height: 1.4;">
                                Gundala (jas), Taluka Vinchhiya, District Rajkot, Gujarat - 360055
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

export default deliveryOtpEmailTemplate;
