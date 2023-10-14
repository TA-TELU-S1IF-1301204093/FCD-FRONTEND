import React, { useState } from "react";
import AdminApi from "../../api/admin/AdminApi";

function AddPriceModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [itemPriceData, setItemPriceData] = useState({
        name: "",
        price: "",
    });

    const handleOnChange = (e) => {
        setItemPriceData({ ...itemPriceData, [e.target.name]: e.target.value });
    };

    const handleSubmitPrice = async () => {
        await AdminApi.post(
            "/orders/price",
            {
                name: itemPriceData.name,
                price: itemPriceData.price,
            },
            {
                headers: {
                    Authorization: `jwt ${localStorage.getItem("adminToken")}`,
                },
            }
        );

        setItemPriceData({
            name: "",
            price: "",
        });
    };

    return (
        <div className="fixed w-full h-full bg-mainGray bg-opacity-50 flex justify-center items-center z-1000">
            <form className="bg-mainWhite p-20 rounded-md w-1/3 h-1/2 flex flex-col items-center">
                <h2 className="text-mainGreen font-bold text-[42px] text-center">
                    Add Item Price
                </h2>
                <div className="mt-10 px-20 w-full flex flex-col gap-5 items-center">
                    <input
                        type="text"
                        name="name"
                        onChange={handleOnChange}
                        value={itemPriceData.name}
                        className="flex w-full justify-between text-mainGray font-semibold text-xl border border-mainGray rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                        placeholder="Input item name"
                    />
                    <input
                        type="number"
                        name="price"
                        onChange={handleOnChange}
                        value={itemPriceData.price}
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
                        onClick={handleSubmitPrice}
                        className="border border-mainGreen bg-mainGreen rounded-lg text-xl text-mainWhite font-semibold px-5 py-1"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddPriceModal;
