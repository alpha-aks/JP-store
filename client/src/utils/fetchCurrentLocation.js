/**
 * Free Location Fetcher
 * Fetches the user's real GPS location using browser Geolocation API
 * and reverse geocodes it for free using OpenStreetMap (Nominatim) with Photon fallback.
 * 100% Free - No Google API keys or recurring costs.
 */

export const getCurrentCoordinates = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve({
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    accuracy: pos.coords.accuracy,
                });
            },
            (error) => {
                let message = "Unable to retrieve your location.";
                if (error.code === 1) {
                    message = "Location access was denied. Please allow location access in your browser or device settings.";
                } else if (error.code === 2) {
                    message = "Location unavailable. Please verify GPS or network connection.";
                } else if (error.code === 3) {
                    message = "Location request timed out. Please try again.";
                }
                reject(new Error(message));
            },
            {
                enableHighAccuracy: true,
                timeout: 12000,
                maximumAge: 0,
            }
        );
    });
};

export const reverseGeocodeFree = async (lat, lon) => {
    // 1. Try OpenStreetMap Nominatim
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&addressdetails=1`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const addr = data.address || {};

            const flatHouseNumber = addr.house_number || addr.building || "";
            const street = addr.road || addr.street || addr.neighbourhood || addr.suburb || "";
            const area = addr.suburb || addr.neighbourhood || addr.residential || addr.county || "";
            const city = addr.city || addr.town || addr.village || addr.municipality || addr.state_district || "";
            const state = addr.state || "";
            const pincode = addr.postcode || "";
            const country = addr.country || "India";

            return {
                latitude: String(lat),
                longitude: String(lon),
                flatHouseNumber,
                street,
                area,
                city,
                state,
                pincode,
                country,
                formattedAddress: data.display_name || [street, area, city, state, pincode].filter(Boolean).join(", "),
            };
        }
    } catch (err) {
        console.warn("Nominatim reverse geocode failed, trying fallback:", err);
    }

    // 2. Fallback to Photon (OSM-based free geocoder)
    try {
        const response = await fetch(`https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`);
        if (response.ok) {
            const data = await response.json();
            const p = data?.features?.[0]?.properties || {};

            const flatHouseNumber = p.housenumber || "";
            const street = p.street || "";
            const area = p.district || p.locality || p.county || "";
            const city = p.city || p.town || p.county || "";
            const state = p.state || "";
            const pincode = p.postcode || "";
            const country = p.country || "India";

            return {
                latitude: String(lat),
                longitude: String(lon),
                flatHouseNumber,
                street,
                area,
                city,
                state,
                pincode,
                country,
                formattedAddress: [p.name, p.street, p.city, p.state, p.postcode, p.country].filter(Boolean).join(", "),
            };
        }
    } catch (err) {
        console.warn("Photon fallback reverse geocode failed:", err);
    }

    // 3. Fallback to raw coordinates if both geocoders failed
    return {
        latitude: String(lat),
        longitude: String(lon),
        flatHouseNumber: "",
        street: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        formattedAddress: `Lat: ${Number(lat).toFixed(5)}, Long: ${Number(lon).toFixed(5)}`,
    };
};

export const fetchCurrentLocation = async () => {
    const coords = await getCurrentCoordinates();
    const addressDetails = await reverseGeocodeFree(coords.latitude, coords.longitude);
    return addressDetails;
};

export default fetchCurrentLocation;
