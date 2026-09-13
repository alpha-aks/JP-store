const verificationEmailTemplate = ({ name, url }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - JP Store</title>
    </head>
    <body style="margin: 0; padding: 30px 10px; background-color: #0c286e; background-image: url('https://images.prismic.io/alphas/ONThie_S2o_hs8SH_bg.jpg?auto=format,compress'); background-size: cover; background-position: center top; background-repeat: no-repeat; font-family: 'Trebuchet MS', 'Segoe UI', Arial, sans-serif;">
        
        <!-- Elevated White Canvas Container (Matching Website Layout) -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4); overflow: hidden;">
            <tr>
                <td style="padding: 16px sm:padding: 20px; background-color: #ffffff;">
                    
                    <!-- Traditional Jharokha Arched Window Frame (Like Category Window Frame) -->
                    <div style="background-color: #fffbf4; background: linear-gradient(180deg, #fffaf2 0%, #ffffff 50%, #fff7ed 100%); border-radius: 36px 36px 16px 16px; border: 2.5px solid #f59e0b; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.2); overflow: hidden;">
                        
                        <!-- Top Arch Crown & Traditional Heritage Bar -->
                        <div style="background-color: #0c286e; padding: 14px 20px 10px 20px; text-align: center; border-bottom: 2px solid #f59e0b;">
                            <p style="margin: 0; color: #fef3c7; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: bold;">
                                ✦ શુદ્ધતા અને વિશ્વાસ • KEM CHO AHMEDABAD ✦
                            </p>
                            <h1 style="margin: 4px 0 0 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: 1px;">
                                JP STORE
                            </h1>
                        </div>

                        <!-- Ahmedabad Banner Edge-to-Edge inside Window Arch -->
                        <div style="padding: 10px 10px 0 10px; text-align: center;">
                            <img 
                                src="https://images.prismic.io/alphas/ZroTVnLBjkcTnobh_Banner-2.png?auto=format,compress" 
                                alt="Kem Cho Ahmedabad - JP Store" 
                                style="width: 100%; max-width: 540px; height: auto; border-radius: 24px 24px 8px 8px; border: 1px solid #fde68a; display: block; margin: 0 auto;"
                            />
                        </div>

                        <!-- Palace Window Alcove Content -->
                        <div style="padding: 24px 24px; text-align: center;">
                            <p style="margin: 0 0 6px 0; color: #d97706; font-size: 12px; font-weight: bold; letter-spacing: 1.5px;">
                                ✦ ઇમેઇલ ચકાસણી • EMAIL VERIFICATION ✦
                            </p>
                            <h2 style="margin: 0 0 16px 0; color: #0c286e; font-size: 22px; font-weight: 800;">
                                Welcome to the Family!
                            </h2>

                            <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 12px 0;">
                                Dear <strong>${name}</strong>,
                            </p>
                            <p style="font-size: 14px; color: #4b5563; line-height: 1.6; margin: 0 auto 20px auto; max-width: 460px;">
                                Thank you for joining <strong>JP Store</strong>! Your daily fresh groceries, dairy, farm-fresh produce, and authentic Gujarati specialties are just one click away.
                            </p>
                            <p style="font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0 0 24px 0;">
                                Please verify your email address to activate your account and start shopping:
                            </p>

                            <!-- Royal Brand Orange Button -->
                            <div style="margin: 26px 0;">
                                <a 
                                    href="${url}" 
                                    style="background-color: #f37023; background: linear-gradient(135deg, #f37023 0%, #ff8c42 100%); color: #ffffff; text-decoration: none; display: inline-block; padding: 14px 34px; font-size: 15px; font-weight: bold; border-radius: 12px; border: 1px solid #ea580c; box-shadow: 0 6px 18px rgba(243, 112, 35, 0.35); text-transform: uppercase; letter-spacing: 0.8px;"
                                >
                                    Verify Email Address &rarr;
                                </a>
                            </div>

                            <p style="font-size: 12px; color: #9ca3af; line-height: 1.4; margin: 20px 0 0 0;">
                                If button doesn&apos;t open, copy and paste this link in your browser:<br>
                                <a href="${url}" style="color: #f37023; word-break: break-all; text-decoration: underline; font-size: 11px;">${url}</a>
                            </p>
                        </div>

                        <!-- Traditional Window Sill Pedestal Base -->
                        <div style="background-color: #fef3c7; background: linear-gradient(90deg, #fef3c7 0%, #ffedd5 50%, #fef3c7 100%); border-top: 2px solid #fcd34d; padding: 18px 20px; text-align: center;">
                            <p style="margin: 0 0 6px 0; font-size: 11px; color: #b45309; font-weight: bold; letter-spacing: 1px;">
                                ✦ તાજગી અને વિશ્વાસનું પ્રતીક ✦
                            </p>
                            <p style="margin: 0 0 4px 0; font-size: 12px; color: #4b5563;">
                                If you did not create an account with JP Store, please ignore this email.
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

export default verificationEmailTemplate;
