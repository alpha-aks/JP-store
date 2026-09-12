import toast from "react-hot-toast"

const AxiosToastError = (error)=>{
    const message = error?.response?.data?.message || error?.message || "Something went wrong";
    const isNetworkError = error?.message === "Network Error" || error?.code === "ERR_NETWORK";

    toast.error(
        isNetworkError ? "Server unreachable (Ensure backend server is running on port 8080)" : message,
        {
            id: isNetworkError ? "server-network-error" : undefined
        }
    );
}

export default AxiosToastError