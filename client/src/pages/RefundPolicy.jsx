import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    ShieldCheck, 
    Video, 
    KeyRound, 
    RotateCcw, 
    AlertTriangle, 
    Clock, 
    CheckCircle2, 
    CreditCard, 
    Scale,
    HelpCircle,
    ArrowLeft
} from "lucide-react";

function RefundPolicy() {
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
                    <span className="text-[#0c286e] font-semibold">Refund, Return & Cancellation Policy</span>
                </div>

                {/* Royal Header Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c286e] via-[#10348a] to-[#0c286e] text-white p-6 sm:p-10 shadow-xl border-2 border-amber-300/40 mb-8">
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-64 h-24 bg-[#f37023]/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 text-center space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                            ✦ Fair Commerce & Anti-Fraud Guarantee ✦
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                            Cancellation, Return & Refund Policy
                        </h1>
                        <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
                            JP Enterprise (operating as JP Store) follows transparent, Razorpay-compliant e-commerce standards. Please read our guidelines to ensure fair service and protection for both genuine customers and store operations.
                        </p>
                        <p className="text-[11px] text-gray-300 pt-1">
                            Last Updated: September 2026 • Effective Immediately
                        </p>
                    </div>
                </div>

                {/* Critical Scam Protection Notice Box */}
                <div className="mb-8 rounded-2xl bg-amber-50 border-2 border-amber-400 p-5 sm:p-6 shadow-sm">
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5 shadow">
                            <Video size={22} />
                        </div>
                        <div className="space-y-1.5 text-xs sm:text-sm">
                            <h2 className="text-sm sm:text-base font-bold text-amber-950 flex items-center gap-2">
                                <span>MANDATORY REQUIREMENT: Continuous 360° Unboxing Video</span>
                            </h2>
                            <p className="text-amber-900 leading-relaxed">
                                To protect our store and genuine buyers against fraudulent claims of missing accessories, empty parcels, wrong products, or physical transit damage, <strong className="font-semibold text-black underline">a clear, continuous, uncut 360-degree unboxing video is strictly mandatory</strong> for all return or damage claims. The video must capture the sealed outer shipping label, original packaging, and immediate product inspection. Claims submitted without an uncut unboxing video cannot be approved.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Policy Clauses */}
                <div className="space-y-6 text-gray-800 text-xs sm:text-sm leading-relaxed">
                    
                    {/* Section 1: Cancellation Policy */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e]">
                                Order Cancellation Policy
                            </h2>
                        </div>
                        
                        <div className="space-y-3 pl-0 sm:pl-11">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">A. Cancellation by Customer (Before Dispatch):</h4>
                                <p className="text-gray-600">
                                    Customers may cancel their order free of charge anytime <strong className="text-gray-900">before the order has been packed and dispatched</strong> for delivery. Once cancelled prior to dispatch, 100% of the transaction amount will be refunded directly to the original payment source via Razorpay.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">B. Cancellation After Dispatch:</h4>
                                <p className="text-gray-600">
                                    Once an order has been dispatched or handed over to our delivery executive, cancellation is not possible. If the package is rejected at the doorstep without valid reason, actual two-way shipping charges may be deducted prior to refund.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 mb-1">C. Cancellation by JP Store (Merchant Rights):</h4>
                                <p className="text-gray-600">
                                    JP Store reserves the absolute right to cancel any order in instances of:
                                </p>
                                <ul className="list-disc list-inside space-y-1 text-gray-600 mt-1 pl-2">
                                    <li>Technical or typographical pricing errors on the website.</li>
                                    <li>Unavailability of stock or discontinued items by manufacturer.</li>
                                    <li>Incomplete or unverified delivery address and unreachable customer phone number.</li>
                                    <li>Orders flagged as high-risk or suspicious by Razorpay fraud prevention algorithms.</li>
                                    <li>Accounts with a documented history of abusive returns or fraudulent chargeback attempts.</li>
                                </ul>
                                <p className="text-gray-600 mt-1">
                                    In case of cancellation by JP Store, 100% of prepaid funds are promptly reversed to the customer.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Delivery OTP Verification */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <KeyRound size={18} className="text-[#f37023]" />
                                Secure Delivery OTP Protocol
                            </h2>
                        </div>

                        <div className="space-y-3 pl-0 sm:pl-11">
                            <p className="text-gray-600">
                                For maximum security, all orders dispatched by JP Store require a confidential <strong className="text-gray-900">4 or 6-digit Delivery OTP</strong> sent to your registered email and mobile number.
                            </p>
                            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-1">
                                <p className="font-semibold">Legal Conclusiveness of OTP Handover:</p>
                                <p className="text-xs text-blue-900">
                                    Sharing your Delivery OTP with the delivery agent constitutes your explicit confirmation that the parcel has been physically received in intact outer condition. After OTP confirmation, claims asserting &ldquo;parcel not received&rdquo; or &ldquo;package was lost by delivery boy&rdquo; will not be accepted as the OTP acts as verifiable digital proof of delivery.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Return Eligibility & 24-48h Window */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e]">
                                Return & Replacement Eligibility
                            </h2>
                        </div>

                        <div className="space-y-3 pl-0 sm:pl-11">
                            <div className="flex items-center gap-2 text-amber-800 font-semibold">
                                <Clock size={16} /> Reporting Window: Within 24 to 48 Hours of Delivery
                            </div>
                            <p className="text-gray-600">
                                We offer replacement or refund for products that arrive <strong className="text-gray-900">physically damaged during transit, defective on arrival (DOA), or mismatched from the ordered model</strong>, subject to the following criteria:
                            </p>
                            
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                    <span>Defect or mismatch must be formally reported within <strong className="text-gray-900">48 hours</strong> of delivery via email at <code className="text-[#f37023] bg-orange-50 px-1.5 py-0.5 rounded">support@jpenterprise.store</code>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                    <span>Continuous unboxing video and clear photographs of the barcode, serial number, and defect must be provided.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                    <span>Product must remain in brand new, unused condition with all original packaging, stickers, brand box, manuals, and accessories.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 4: Non-Returnable Items (Anti-Scam Guardrails) */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm">
                                4
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-red-700 flex items-center gap-2">
                                <AlertTriangle size={18} />
                                Strictly Non-Returnable & Non-Refundable Items
                            </h2>
                        </div>

                        <div className="space-y-2.5 pl-0 sm:pl-11 text-gray-600">
                            <p>Returns will be rejected without refund if the item falls into any of the following categories:</p>
                            <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-700">
                                <li><strong>Tempered Glass / Screen Protectors:</strong> Once the adhesive backing film is peeled off or applied.</li>
                                <li><strong>User-Inflicted Physical Damage:</strong> Broken phone cases, bent charging connectors, severed cable wires, dropped items, cracked lenses, or scratches incurred after delivery.</li>
                                <li><strong>Liquid / Electrical Damage:</strong> Water damage, burnt circuitry from unauthorized voltage adapters, or short circuits due to misuse.</li>
                                <li><strong>Missing Components:</strong> Items returned without the original brand box, warranty card, user guide, or bundled accessories.</li>
                                <li><strong>Serial Number / Barcode Tampering:</strong> Any product where the serial number or IMEI does not match our dispatch inventory scan.</li>
                                <li><strong>Change of Mind:</strong> We do not offer returns for subjective reasons (e.g. &ldquo;I ordered the wrong phone model by mistake&rdquo; or &ldquo;I no longer want this color&rdquo;) once the product box has been unsealed.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5: Razorpay Refund Timelines */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                5
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <CreditCard size={18} className="text-[#f37023]" />
                                Refund Process & Razorpay Timelines
                            </h2>
                        </div>

                        <div className="space-y-3 pl-0 sm:pl-11 text-gray-600">
                            <p>
                                All customer refunds are processed strictly via our authorized payment partner <strong className="text-gray-900">Razorpay</strong> back to the original funding source:
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                                    <p className="font-bold text-gray-900 text-xs uppercase text-[#0c286e]">UPI / Wallet</p>
                                    <p className="text-xs text-gray-600 mt-1">24 to 48 business hours</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                                    <p className="font-bold text-gray-900 text-xs uppercase text-[#0c286e]">Debit / Credit Cards</p>
                                    <p className="text-xs text-gray-600 mt-1">5 to 7 business days</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                                    <p className="font-bold text-gray-900 text-xs uppercase text-[#0c286e]">Net Banking</p>
                                    <p className="text-xs text-gray-600 mt-1">3 to 7 business days</p>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 pt-2">
                                Note: Refunds are initiated only after the returned product reaches our Gundala facility and passes quality check (QC). In compliance with financial regulations, no cash refunds are issued for digital transactions.
                            </p>
                        </div>
                    </div>

                    {/* Section 6: Chargeback & Legal Anti-Fraud Clause */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                6
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <Scale size={18} className="text-[#f37023]" />
                                Fraud Prevention, Friendly Fraud & Chargebacks
                            </h2>
                        </div>

                        <div className="space-y-2.5 pl-0 sm:pl-11 text-gray-600">
                            <p>
                                JP Store maintains meticulous digital audit trails for all dispatches, including dispatch CCTV packing recordings, weight logs, courier handovers, GPS coordinates, and signed Delivery OTP receipts.
                            </p>
                            <p>
                                Any attempt at <strong className="text-gray-900">&ldquo;friendly fraud&rdquo;</strong> (falsely claiming an order was not received despite verified OTP, returning a different / used product inside the box, or initiating fraudulent bank chargebacks after taking delivery) will be formally contested with full evidence submitted to Razorpay, the issuing bank, and law enforcement agencies under applicable sections of the <strong className="text-gray-900">Information Technology Act, 2000</strong> and <strong className="text-gray-900">Indian Penal Code (IPC)</strong>.
                            </p>
                        </div>
                    </div>

                    {/* Section 7: Grievance & Contact */}
                    <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 p-6 sm:p-8 rounded-2xl border border-amber-300 shadow-sm space-y-3">
                        <div className="flex items-center gap-2 text-[#0c286e] font-bold text-base">
                            <HelpCircle size={18} className="text-[#f37023]" />
                            Need Help With a Return or Cancellation?
                        </div>
                        <p className="text-gray-600">
                            Our team is dedicated to fast, fair resolution for all authentic requests. Please reach out to our customer support desk:
                        </p>
                        <div className="space-y-1 text-xs sm:text-sm text-gray-800">
                            <p><strong>Store Address:</strong> JP Store (JP Enterprise), Main Bazaar, Gundala (Jas), Taluka Vinchhiya, District Rajkot, Gujarat - 360055</p>
                            <p><strong>Official Email:</strong> <a href="mailto:support@jpenterprise.store" className="text-[#f37023] font-semibold underline">support@jpenterprise.store</a></p>
                            <p><strong>Phone Support:</strong> +91 98765 43210 (7:00 AM – 11:00 PM IST)</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RefundPolicy;
