import React, { useState } from "react";
import orderApi from "../api/order-api";

function AddOrderModal({ isOpen, onClose, userId }) {
    if (!isOpen) return null;

    const [orderData, setOrderData] = useState({
        name: "",
        amount: "",
    });

    const handleOnChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    const handleSubmitOrder = async () => {
        console.log(orderData);
        await orderApi
            .post("/order", {
                name: orderData.name,
                amount: orderData.amount,
                _id: userId,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setOrderData({
            name: "",
            amount: "",
        });
    };

    return (
        <div className="fixed w-full h-full bg-mainGray bg-opacity-50 flex justify-center items-center z-1000">
            <form className="bg-mainWhite p-20 rounded-md w-1/3 h-1/2 flex flex-col items-center">
                <h2 className="text-mainGreen font-bold text-[42px] text-center">
                    Input Order Data
                </h2>
                <div className="mt-10 px-20 w-full flex flex-col gap-5 items-center">
                    <input
                        type="text"
                        name="name"
                        onChange={handleOnChange}
                        value={orderData.name}
                        className="flex w-full justify-between text-mainGray font-semibold text-xl border border-mainGray rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                        placeholder="Input item name"
                    />
                    <input
                        type="number"
                        name="amount"
                        onChange={handleOnChange}
                        value={orderData.amount}
                        className="flex w-full justify-between text-mainGray font-semibold text-xl border border-mainGray rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                        placeholder="Input item amount"
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
                        onClick={handleSubmitOrder}
                        className="border border-mainGreen bg-mainGreen rounded-lg text-xl text-mainWhite font-semibold px-5 py-1"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddOrderModal;
