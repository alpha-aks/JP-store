import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
    Truck, 
    Clock, 
    MapPin, 
    ShieldCheck, 
    KeyRound, 
    AlertCircle, 
    ArrowLeft,
    CheckCircle2
} from "lucide-react";

function ShippingPolicy() {
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
                    <span className="text-[#0c286e] font-semibold">Shipping &amp; Delivery Policy</span>
                </div>

                {/* Royal Header Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c286e] via-[#10348a] to-[#0c286e] text-white p-6 sm:p-10 shadow-xl border-2 border-amber-300/40 mb-8">
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-64 h-24 bg-[#f37023]/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 text-center space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                            ✦ Fast Doorstep Logistics ✦
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                            Shipping &amp; Delivery Policy
                        </h1>
                        <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
                            Reliable, rapid doorstep delivery for mobile accessories and electronic gadgets across Gundala, Jasdan, Rajkot, and statewide Gujarat.
                        </p>
                        <p className="text-[11px] text-gray-300 pt-1">
                            Operated by JP Enterprise • Last Updated: September 2026
                        </p>
                    </div>
                </div>

                {/* Content Cards */}
                <div className="space-y-6 text-gray-800 text-xs sm:text-sm leading-relaxed">

                    {/* Section 1: Delivery Coverage */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                1
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <MapPin size={18} className="text-[#f37023]" />
                                Serviceable Delivery Locations
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>
                                JP Store proudly operates from our hub in Gundala (Jas), Taluka Vinchhiya, District Rajkot, Gujarat. We provide:
                            </p>
                            <ul className="space-y-2 text-gray-700 pt-1">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                    <span><strong>Local Fast-Track Delivery:</strong> Gundala, Jasdan, Vinchhiya, and neighboring villages (same-day or rapid delivery within 30 to 120 minutes).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 size={16} className="text-green-600 mt-0.5 shrink-0" />
                                    <span><strong>Regional &amp; Statewide Delivery:</strong> Rajkot, Ahmedabad, Surat, Vadodara, and all serviceable pin codes across Gujarat (typically 1 to 3 business days).</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 2: Timelines & Schedules */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                2
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <Clock size={18} className="text-[#f37023]" />
                                Dispatch &amp; Estimated Delivery Timelines
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-3 text-gray-600">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                    <p className="font-bold text-[#0c286e] text-sm">Gundala Local Hub</p>
                                    <p className="text-xs text-gray-600 mt-1">Dispatched within 30 minutes. Delivered same-day (7:00 AM – 10:00 PM).</p>
                                </div>
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                                    <p className="font-bold text-[#0c286e] text-sm">Gujarat Regional Delivery</p>
                                    <p className="text-xs text-gray-600 mt-1">Dispatched within 24 hours. Delivered in 1 to 3 business days via reputable express couriers.</p>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">
                                Orders placed on Sundays or public holidays will be dispatched on the next working business day.
                            </p>
                        </div>
                    </div>

                    {/* Section 3: Delivery OTP Handover */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                3
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e] flex items-center gap-2">
                                <KeyRound size={18} className="text-[#f37023]" />
                                Mandatory Doorstep Delivery OTP Verification
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2.5 text-gray-600">
                            <p>
                                To protect your order against package theft and misdelivery, every dispatch is protected by a unique <strong className="text-gray-900">Delivery OTP</strong>.
                            </p>
                            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs">
                                <strong>Important Handover Rule:</strong> Please inspect the outer package seal at the doorstep before providing the OTP to the delivery executive. Once the OTP is shared, the order is verified as delivered in good outer condition.
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Shipping Charges */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                4
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e]">
                                Shipping Charges &amp; Tracking
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>
                                Applicable shipping fees, if any, are clearly calculated and presented on the <strong className="text-gray-900">Checkout page</strong> before you make payment. We offer Free Shipping on promotional items or orders exceeding our designated basket thresholds.
                            </p>
                            <p>
                                You can track the real-time status of your order anytime under <strong className="text-gray-900">Dashboard &gt; My Orders</strong> on our website.
                            </p>
                        </div>
                    </div>

                    {/* Section 5: Undelivered Shipments */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#f37023] flex items-center justify-center font-bold text-sm">
                                5
                            </div>
                            <h2 className="text-base sm:text-lg font-bold text-[#0c286e]">
                                Failed Delivery Attempts &amp; Inaccurate Addresses
                            </h2>
                        </div>
                        <div className="pl-0 sm:pl-11 space-y-2 text-gray-600">
                            <p>
                                Our courier partners will attempt delivery up to two (2) times and contact you on your registered phone number. If delivery fails due to:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-gray-700 pl-1">
                                <li>Incorrect, incomplete, or unserviceable address provided by customer.</li>
                                <li>Customer unreachable or refusing to provide the Delivery OTP.</li>
                                <li>Customer unavailable during scheduled delivery attempts.</li>
                            </ul>
                            <p className="pt-1 text-xs text-gray-500">
                                The package will be returned to our fulfillment hub, and any refund issued will have the actual two-way shipping costs deducted.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ShippingPolicy;
