import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    ShieldCheck, 
    Building2, 
    Send, 
    CheckCircle, 
    ArrowLeft
} from "lucide-react";
import toast from "react-hot-toast";

function ContactUs() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setSubmitted(true);
        toast.success("Thank you! Your message has been received. Our team will contact you within 24 hours.");
    };

    return (
        <div className="w-full bg-[#fafafb] min-h-screen py-6 sm:py-10 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                {/* Navigation Breadcrumb */}
                <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                    <Link to="/" className="flex items-center gap-1 hover:text-[#f37023] transition-colors">
                        <ArrowLeft size={15} /> Home
                    </Link>
                    <span>/</span>
                    <span className="text-[#0c286e] font-semibold">Contact Us</span>
                </div>

                {/* Royal Header Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0c286e] via-[#10348a] to-[#0c286e] text-white p-6 sm:p-10 shadow-xl border-2 border-amber-300/40 mb-8">
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-64 h-24 bg-[#f37023]/20 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="relative z-10 text-center space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                            ✦ We Are Here To Help ✦
                        </div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                            Contact Customer Support
                        </h1>
                        <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl mx-auto leading-relaxed">
                            Have a question about your order, tracking, warranty, or returns? Reach out to our Gundala store team anytime.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Column: Official Store Info & Compliance */}
                    <div className="lg:col-span-5 space-y-4">
                        
                        {/* Store Address Card */}
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#f37023] flex items-center justify-center shrink-0">
                                    <Building2 size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">JP Enterprise</h3>
                                    <p className="text-xs text-gray-500">Operating as JP Store</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-xs sm:text-sm text-gray-600 pt-2 border-t border-gray-100">
                                <div className="flex items-start gap-3">
                                    <MapPin size={17} className="text-[#f37023] shrink-0 mt-0.5" />
                                    <span>Main Bazaar, Gundala (Jas), Taluka Vinchhiya, District Rajkot, Gujarat - 360055, India</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone size={16} className="text-[#f37023] shrink-0" />
                                    <span>+91 98765 43210</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail size={16} className="text-[#f37023] shrink-0" />
                                    <a href="mailto:support@jpenterprise.store" className="text-[#f37023] font-semibold hover:underline">
                                        support@jpenterprise.store
                                    </a>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-[#f37023] shrink-0" />
                                    <span>Open All 7 Days: 7:00 AM – 11:00 PM IST</span>
                                </div>
                            </div>
                        </div>

                        {/* Razorpay Verified Badge Box */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200 text-blue-950 space-y-2">
                            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#0c286e]">
                                <ShieldCheck size={18} className="text-blue-600" />
                                Razorpay Verified Merchant
                            </div>
                            <p className="text-xs text-blue-900/90 leading-relaxed">
                                Payments on JP Store are processed through 256-bit SSL encryption. All return and refund resolutions adhere strictly to RBI and Razorpay merchant operational guidelines.
                            </p>
                        </div>

                    </div>

                    {/* Right Column: Interactive Message Form */}
                    <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-base sm:text-lg font-bold text-[#0c286e] mb-1">
                            Send Us a Direct Message
                        </h2>
                        <p className="text-xs text-gray-500 mb-5">
                            Fill in your inquiry and our support team will reply within 24 business hours.
                        </p>

                        {submitted ? (
                            <div className="py-12 text-center space-y-3">
                                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                                    <CheckCircle size={28} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">Message Delivered!</h3>
                                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                                    Thank you for contacting JP Store. A member of our support team will review your message and email you shortly.
                                </p>
                                <button
                                    onClick={() => {
                                        setSubmitted(false);
                                        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
                                    }}
                                    className="text-xs text-[#f37023] font-semibold underline mt-2"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Your Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#f37023] focus:ring-1 focus:ring-[#f37023] outline-none text-xs sm:text-sm transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#f37023] focus:ring-1 focus:ring-[#f37023] outline-none text-xs sm:text-sm transition"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="yourname@gmail.com"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#f37023] focus:ring-1 focus:ring-[#f37023] outline-none text-xs sm:text-sm transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Subject / Order ID</label>
                                    <input
                                        type="text"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                        placeholder="e.g. Inquiry regarding Order #12345"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#f37023] focus:ring-1 focus:ring-[#f37023] outline-none text-xs sm:text-sm transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Message *</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder="How can we help you today?"
                                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#f37023] focus:ring-1 focus:ring-[#f37023] outline-none text-xs sm:text-sm transition resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 bg-gradient-to-r from-[#f37023] to-[#ff8c42] hover:from-[#e05e10] hover:to-[#f37023] text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition duration-200"
                                >
                                    <Send size={16} />
                                    Submit Inquiry
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ContactUs;
