import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    ShieldCheck, 
    Lock, 
    Eye, 
    Database, 
    CreditCard, 
    Cookie, 
    UserCheck, 
    Mail, 
    ArrowLeft,
    Building2
} from "lucide-react";

function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="w-full bg-[#fafafb] min-h-screen py-6 sm:py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Navigation Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <Link to="/" className="flex items-center gap-1 hover:text-[#f37023] transition-colors">
                        <ArrowLeft size={15} /> Home
                    </Link>
                    <span>/</span>
                    <span className="text-[#0c286e] font-semibold">Privacy Policy</span>
                </div>

                {/* Royal Header Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c286e] via-[#10348a] to-[#0c286e] text-white p-6 sm:p-10 shadow-xl border-2 border-amber-300/40 mb-8">
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-64 h-24 bg-[#f37023]/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 text-center space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                            ✦ Data Protection & Security Commitment ✦
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
                            Your trust is our highest priority. Learn how JP Enterprise collects, protects, and handles your personal information when you shop with JP Store.
                        </p>
                        <p className="text-[11px] text-gray-300 pt-1">
                            Compliance: Information Technology Act, 2000 &amp; Digital Personal Data Protection (DPDP) Act, 2023
                        </p>
                    </div>
                </div>

                {/* Policy Clauses */}
                <div className="space-y-6 text-gray-800 text-xs sm:text-sm leading-relaxed">

                    {/* Section 1: Overview & Scope */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e]">
                                Introduction &amp; Scope
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>
                                This Privacy Policy outlines how <strong className="text-gray-900">JP Enterprise</strong> (operating as &ldquo;JP Store&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, stores, and safeguards your personal data across our online store at <strong className="text-gray-900">https://www.jpenterprise.store</strong>.
                            </p>
                            <p>
                                By accessing our services, creating an account, or purchasing products, you consent to the data practices described herein. If you do not agree with any terms, please discontinue using the website.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Information We Collect */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <Database size={18} className="text-[#f37023]" />
                                Information We Collect
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-3 text-gray-600">
                            <p>We collect information necessary to fulfill orders, verify identities, and prevent fraud:</p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <strong>Contact &amp; Identity Data:</strong> Full Name, Email Address, and Mobile Phone Number (authenticated via One-Time Password / OTP).
                                </li>
                                <li className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <strong>Delivery Address &amp; Geolocation:</strong> House/Flat Number, Street, Landmark, Village/City (Gundala, Jasdan, Rajkot, etc.), Pincode, and optional GPS coordinates requested with your permission to ensure accurate doorstep delivery.
                                </li>
                                <li className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <strong>Transactional Records:</strong> Purchased product items, transaction amounts, timestamps, delivery OTP logs, and order history.
                                </li>
                                <li className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <strong>Technical &amp; Log Information:</strong> IP address, device model, operating system, browser type, and timestamps used exclusively for cybersecurity monitoring and fraud prevention.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3: Payment Data Security (Razorpay) */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <CreditCard size={18} className="text-[#f37023]" />
                                Payment Data Security (Zero Card Storage)
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-3 text-gray-600">
                            <div className="p-4 rounded-xl bg-green-50 border border-green-300 text-green-950 space-y-1">
                                <p className="font-bold flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-green-600" />
                                    PCI-DSS Level 1 Encrypted Processing via Razorpay
                                </p>
                                <p className="text-xs text-green-900 leading-relaxed">
                                    JP Store <strong>never stores, sees, or retains your sensitive financial data</strong> (including credit card numbers, debit card CVVs, net banking credentials, or UPI MPINs). All payments are handled directly by <strong>Razorpay Software Private Limited</strong> through banking-grade 256-bit SSL encrypted channels under strict RBI guidelines.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Purpose of Data Usage */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                4
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e]">
                                Purpose of Data Collection
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>We process your personal information only for legitimate business purposes:</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1">
                                <li>Fulfilling orders, packaging, and dispatching products to your verified address.</li>
                                <li>Sending critical transactional communications (Order Confirmation, Delivery OTP, Invoice, Password Reset) via our verified email service (Resend).</li>
                                <li>Customer support inquiry resolution and returns/replacement processing.</li>
                                <li>Preventing fraudulent orders, chargeback abuse, and unauthorized account access.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5: Cookies & Local Storage */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                5
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <Cookie size={18} className="text-[#f37023]" />
                                Cookies &amp; Local Storage Usage
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>
                                JP Store uses secure browser cookies and local storage items (such as <code className="text-[#f37023] bg-orange-50 px-1 py-0.5 rounded">accessToken</code>, <code className="text-[#f37023] bg-orange-50 px-1 py-0.5 rounded">refreshToken</code>, and <code className="text-[#f37023] bg-orange-50 px-1 py-0.5 rounded">jp_cached_categories</code>) to:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1">
                                <li>Keep you safely logged into your user account during your browsing session.</li>
                                <li>Preserve items added to your shopping cart across page navigation.</li>
                                <li>Provide instantaneous category loading on mobile network connections.</li>
                            </ul>
                            <p className="text-xs text-gray-500 pt-1">
                                We do not use intrusive third-party cross-site advertising tracking cookies.
                            </p>
                        </div>
                    </div>

                    {/* Section 6: Third-Party Integrations */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                6
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e]">
                                Third-Party Service Providers
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>
                                We share minimal, strictly necessary data with trusted technological partners solely to deliver our services:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1">
                                <li><strong>Razorpay:</strong> Payment processing and refund settlement under RBI regulations.</li>
                                <li><strong>Resend:</strong> Transactional email dispatch for OTPs and invoices.</li>
                                <li><strong>Cloudinary:</strong> Secure cloud media storage for profile avatars and product catalogues.</li>
                                <li><strong>Logistics Partners &amp; Delivery Executives:</strong> Sharing your name, delivery address, and phone number exclusively for order handover.</li>
                            </ul>
                            <p className="pt-1 font-semibold text-gray-800">
                                We never sell, rent, or trade your personal data to third-party marketing companies.
                            </p>
                        </div>
                    </div>

                    {/* Section 7: Data Retention & Security */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                7
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <Lock size={18} className="text-[#f37023]" />
                                Data Retention &amp; Security Standards
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>
                                We employ industry-standard encryption, SSL protocols, firewalls, and MongoDB authentication access controls to prevent unauthorized access, alteration, or disclosure of your personal data.
                            </p>
                            <p>
                                Transactional records are retained as mandated by Indian GST, taxation, and audit laws, after which data is securely purged.
                            </p>
                        </div>
                    </div>

                    {/* Section 8: Your Rights & Grievance Redressal */}
                    <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 p-6 sm:p-8 rounded-2xl border border-amber-300 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 text-[#0c286e] font-bold text-base">
                            <Building2 size={18} className="text-[#f37023]" />
                            Grievance Officer &amp; Contact Details
                        </div>
                        <p className="text-gray-600">
                            In compliance with Rule 5(9) of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011:
                        </p>
                        <div className="text-xs sm:text-sm text-gray-800 space-y-1 pt-1">
                            <p><strong>Grievance Officer:</strong> Compliance &amp; Privacy Officer</p>
                            <p><strong>Entity:</strong> JP Enterprise (JP Store)</p>
                            <p><strong>Physical Address:</strong> Main Bazaar, Gundala (Jas), Taluka Vinchhiya, District Rajkot, Gujarat - 360055, India</p>
                            <p><strong>Email:</strong> <a href="mailto:support@jpenterprise.store" className="text-[#f37023] font-semibold underline">support@jpenterprise.store</a></p>
                            <p><strong>Phone:</strong> +91 98765 43210 (10:00 AM – 6:00 PM IST, Monday to Saturday)</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
