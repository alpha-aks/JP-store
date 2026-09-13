/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/Axios";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]);
    const [isAddressMenuOpen, setIsAddressMenuOpen] = useState(false);
    const [openAddNewAddressMenu, setOpenAddNewAddressMenu] = useState(false);
    const [openEditAddressMenu, setOpenEditAddressMenu] = useState(null);

    const fetchAddress = async () => {
        try {
            const response = await Axios({ ...summaryApi.getAddress });
            if (response.data.success) {
                setAddresses(response.data.data || []);
                return response.data.data;
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
            setAddresses([]);
            return [];
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    return (
        <AddressContext.Provider
            value={{
                addresses,
                setAddresses,
                fetchAddress,
                isAddressMenuOpen,
                setIsAddressMenuOpen,
                openAddNewAddressMenu,
                setOpenAddNewAddressMenu,
                openEditAddressMenu,
                setOpenEditAddressMenu,
            }}
        >
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => useContext(AddressContext);
export default AddressContext;
