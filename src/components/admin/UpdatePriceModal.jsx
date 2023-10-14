import React, { useEffect, useState } from "react";
import AdminApi from "../../api/admin/AdminApi";

function UpdatePriceModal({ orderId, itemName, isOpen, onClose }) {
    if (!isOpen) return null;

    const [newItemPrice, setNewItemPrice] = useState(0);

    const handleOnChange = (e) => {
        setNewItemPrice({ ...newItemPrice, [e.target.name]: e.target.value });
    };

    const updateItemPrice = async (e) => {
        e.preventDefault();
        await AdminApi.put(
            `/orders/price/${orderId}`,
            {
                price: newItemPrice.price,
            },
            {
                headers: {
                    Authorization: `jwt ${localStorage.getItem("adminToken")}`,
                },
            }
        ).catch((error) => {
            alert(error);
        });

        setNewItemPrice(0);
        onClose();
    };

    return (
        <div className="fixed w-full h-full bg-mainGray bg-opacity-50 flex justify-center items-center z-1000">
            <form className="bg-mainWhite p-20 rounded-md w-1/3 h-1/2 flex flex-col items-center">
                <h2 className="text-mainGreen font-bold text-[42px] text-center">
                    Update Price
                </h2>
                <div className="mt-10 px-20 w-full flex flex-col gap-5 items-center">
                    <h2 className="text-mainGreen text-xl font-semibold">
                        {itemName}
                    </h2>
                    <input
                        type="number"
                        name="price"
                        onChange={handleOnChange}
                        className="flex w-full justify-between text-mainGray font-semibold text-xl border border-mainGray rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                        placeholder="Input item price"
                    />
                </div>
                <div className="mt-10 w-full h-auto flex items-center justify-evenly">
                    <button
                        onClick={onClose}
                        className="border border-mainRed rounded-lg text-xl text-mainRed font-semibold px-5 py-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={updateItemPrice}
                        className="border border-mainGreen bg-mainGreen rounded-lg text-xl text-mainWhite font-semibold px-5 py-1"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePriceModal;
