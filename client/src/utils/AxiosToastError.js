import toast from "react-hot-toast"

const AxiosToastError = (error) => {
    const rawMessage = error?.response?.data?.message || error?.message || "Something went wrong";
    const status = error?.response?.status;
    const isNetworkError = error?.message === "Network Error" || error?.code === "ERR_NETWORK";

    let friendlyMessage = rawMessage;
    const lower = String(rawMessage).toLowerCase();

    // Catch technical JWT, unauthorized, or session errors
    if (
        status === 401 ||
        lower.includes("jwt") ||
        lower.includes("token") ||
        lower.includes("unauthorized") ||
        lower.includes("not logged in")
    ) {
        if (lower.includes("expired")) {
            friendlyMessage = "Your session has expired. Please log in again to continue.";
        } else {
            friendlyMessage = "You need to login before adding product to cart or continuing.";
        }
    } else if (isNetworkError) {
        friendlyMessage = "Unable to connect to server. Please check your internet connection.";
    }

    toast.error(friendlyMessage, {
        id: isNetworkError ? "server-network-error" : (status === 401 ? "auth-login-required" : undefined)
    });
}

export default AxiosToastError