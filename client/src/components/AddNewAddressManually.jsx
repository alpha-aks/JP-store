/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { BiCurrentLocation } from "react-icons/bi";
import { TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchCurrentLocation from "../utils/fetchCurrentLocation";
import { useAddress } from "../provider/AddressContext";

// Images
import home from "../assets/home.avif";
import work from "../assets/work.avif";
import hotel from "../assets/hotel.avif";
import other from "../assets/other.avif";

function AddNewAddressManually({ setOpenAddNewAddressMenu, setIsAddressMenuOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { fetchAddress } = useAddress();

    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const [detectedSummary, setDetectedSummary] = useState("");

    const [addressData, setAddressData] = useState({
        saveAs: "home",
        flatHouseNumber: "",
        floor: "",
        street: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        name: "",
        mobileNumber: "",
        latitude: "0.0",
        longitude: "0.0",
        defaultAddress: true,
    });

    const [openOtherAsSaveAddressAs, setOpenOtherAsSaveAddressAs] = useState(false);

    const handleChange = (field) => (event) => {
        setAddressData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleClose = () => {
        if (location.pathname === "/add-new-address") {
            navigate(-1);
        } else {
            setOpenAddNewAddressMenu(false);
        }
    };

    const handleDetectLocation = async () => {
        try {
            setIsDetectingLocation(true);
            const loc = await fetchCurrentLocation();

            setAddressData((prev) => ({
                ...prev,
                flatHouseNumber: loc.flatHouseNumber || prev.flatHouseNumber,
                street: loc.street || prev.street,
                area: loc.area || prev.area,
                city: loc.city || prev.city,
                state: loc.state || prev.state,
                pincode: loc.pincode || prev.pincode,
                country: loc.country || prev.country || "India",
                latitude: String(loc.latitude),
                longitude: String(loc.longitude),
            }));

            const summary = [loc.street, loc.area, loc.city, loc.pincode].filter(Boolean).join(", ") || "Current Location";
            setDetectedSummary(summary);
            toast.success("Current location detected & auto-filled!");
        } catch (error) {
            console.error("Location fetch error:", error);
            toast.error(error.message || "Unable to retrieve location. Please fill manually.");
        } finally {
            setIsDetectingLocation(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await Axios({
                ...summaryApi.addNewAddress,
                data: addressData,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                if (fetchAddress) {
                    await fetchAddress();
                }
                if (location.pathname === "/add-new-address") {
                    navigate(-1);
                } else {
                    setIsAddressMenuOpen(true);
                    setOpenAddNewAddressMenu(false);
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-800/70 flex justify-center items-center h-full z-40 overflow-y-auto w-full p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative h-full overflow-scroll">

                {/* Free Location Fetcher Widget (Replacing the Google API Cost note) */}
                <div className="mb-4 p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-orange-50 border border-emerald-200 rounded-xl shadow-xs">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                                <BiCurrentLocation className={`text-lg ${isDetectingLocation ? "animate-spin" : ""}`} />
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-gray-800">Use Current Location</span>
                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.2 rounded border border-emerald-300">
                                        FREE GPS
                                    </span>
                                </div>
                                <p className="text-[11px] text-gray-500">
                                    1-tap auto-fill using your device GPS
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleDetectLocation}
                            disabled={isDetectingLocation}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all flex items-center gap-1 shrink-0 ${
                                isDetectingLocation
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#0c831f] hover:bg-[#096a18] active:scale-95 cursor-pointer shadow-sm"
                            }`}
                        >
                            <BiCurrentLocation size={14} />
                            <span>{isDetectingLocation ? "Locating..." : "Auto Fetch"}</span>
                        </button>
                    </div>
                    {detectedSummary && (
                        <div className="mt-2 pt-2 border-t border-emerald-200/70 text-[11px] text-emerald-800 flex items-center justify-between">
                            <span className="truncate max-w-[280px]">📍 {detectedSummary}</span>
                            <span className="text-emerald-600 font-medium shrink-0">✓ Auto-filled</span>
                        </div>
                    )}
                </div>

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                    <h2 className="text-lg font-bold">Enter Complete Address</h2>
                    <button className="text-gray-500 cursor-pointer" onClick={handleClose}>
                        <IoCloseCircleSharp size={25} />
                    </button>
                </div>

                {/* Save As Tags */}
                <div className="mt-4 pb-2">
                    <p className="text-sm text-gray-400 pb-2">Save address as *</p>
                    <div className="flex gap-2 flex-wrap">
                        {["home", "work", "hotel"].map((label) => (
                            <button
                                key={label}
                                className={`flex items-center shadow-md p-2 gap-1 rounded-lg border ${
                                    addressData.saveAs === label
                                        ? "bg-[#EBFFEF] border-green-700"
                                        : "bg-white border-gray-200"
                                }`}
                                onClick={() => {
                                    setAddressData((prev) => ({ ...prev, saveAs: label }));
                                    setOpenOtherAsSaveAddressAs(false);
                                }}
                            >
                                <img
                                    src={label === "home" ? home : label === "work" ? work : hotel}
                                    alt={label}
                                    className="w-5 h-5"
                                />
                                <span className="capitalize">{label}</span>
                            </button>
                        ))}
                        <button
                            className={`flex items-center shadow-md p-2 gap-1 rounded-lg border ${
                                addressData.saveAs === "other"
                                    ? "bg-[#EBFFEF] border-green-700"
                                    : "bg-white border-gray-200"
                            }`}
                            onClick={() => {
                                setAddressData((prev) => ({ ...prev, saveAs: "other" }));
                                setOpenOtherAsSaveAddressAs(true);
                            }}
                        >
                            <img src={other} alt="Other" className="w-5 h-5" />
                            <span>Other</span>
                        </button>
                    </div>
                </div>

                {/* Optional "Other" Text Field */}
                {openOtherAsSaveAddressAs && (
                    <div className="mt-2">
                        <TextField
                            label="Save As (Custom)"
                            fullWidth
                            value={addressData.saveAs}
                            onChange={handleChange("saveAs")}
                        />
                    </div>
                )}

                {/* Form Fields */}
                <div className="mt-4 space-y-3">
                    <div className="flex flex-col gap-5">
                        <TextField label="Flat / House No / Building" fullWidth value={addressData.flatHouseNumber} onChange={handleChange("flatHouseNumber")} />
                        <TextField label="Floor (Optional)" fullWidth value={addressData.floor} onChange={handleChange("floor")} />
                        <TextField label="Street" fullWidth value={addressData.street} onChange={handleChange("street")} />
                        <TextField label="Area" fullWidth value={addressData.area} onChange={handleChange("area")} />
                        <TextField label="Landmark (Optional)" fullWidth value={addressData.landmark} onChange={handleChange("landmark")} />
                        <TextField label="City" fullWidth value={addressData.city} onChange={handleChange("city")} />
                        <TextField label="State" fullWidth value={addressData.state} onChange={handleChange("state")} />
                        <TextField label="Pincode" fullWidth value={addressData.pincode} onChange={handleChange("pincode")} />
                        <TextField label="Country" fullWidth value={addressData.country} onChange={handleChange("country")} />
                        <TextField label="Name" fullWidth value={addressData.name} onChange={handleChange("name")} />
                        <TextField label="Mobile Number" fullWidth value={addressData.mobileNumber} onChange={handleChange("mobileNumber")} />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
                        Save Address
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddNewAddressManually;
