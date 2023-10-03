import React from "react";

function DeleteOrderModal({ isOpen, onClose, onConfirm, orderData }) {
    if (!isOpen) return null;

    return (
        <div className="fixed w-full h-full bg-mainGray bg-opacity-50 flex justify-center items-center z-1000">
            <div className="bg-mainWhite p-20 rounded-md w-1/3 h-1/2 flex flex-col items-center">
                <h2 className="text-mainGreen font-bold text-[42px] text-center">
                    Delete Order Data
                </h2>
                <div className="mt-10 px-20 w-full flex flex-col gap-3 items-center">
                    <div className="flex w-full justify-between">
                        <p className="text-mainGray font-semibold text-xl">
                            Name
                        </p>
                        <p className="text-mainGray font-normal text-xl">
                            {orderData.name}
                        </p>
                    </div>
                    <div className="flex w-full justify-between">
                        <p className="text-mainGray font-semibold text-xl">
                            Amount
                        </p>
                        <p className="text-mainGray font-normal text-xl">
                            {orderData.amount}
                        </p>
                    </div>
                    <div className="flex w-full justify-between">
                        <p className="text-mainGray font-semibold text-xl">
                            Date
                        </p>
                        <p className="text-mainGray font-normal text-xl">
                            {orderData.date}
                        </p>
                    </div>
                    <div className="flex w-full justify-between">
                        <p className="text-mainGray font-semibold text-xl">
                            Total price
                        </p>
                        <p className="text-mainGray font-normal text-xl">
                            {orderData.price}
                        </p>
                    </div>
                </div>
                <div className="mt-10 w-full h-auto flex items-center justify-evenly">
                    <button
                        onClick={onClose}
                        className="border border-mainGreen rounded-lg text-xl text-mainGreen font-semibold px-5 py-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="border border-mainRed bg-mainRed rounded-lg text-xl text-mainWhite font-semibold px-5 py-1"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteOrderModal;
