import React, { useEffect, useState } from "react";
import { format } from "date-fns";

// local import
import Sidebar from "../components/sidebar";
import orderApi from "../api/order-api";
import userApi from "../api/user-api";
import DeleteOrderModal from "../components/delete-order-modal";

function Summary() {
    const [selectedDate, setSelectedDate] = useState("");

    const [userId, setUserId] = useState("");
    const [orderData, setOrderData] = useState();

    // handle the date selection naming
    const getDayName = (unformattedDate) => {
        // console.log(unformattedDate);
        var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        var d = new Date(unformattedDate);
        return days[d.getDay()];
    };

    const handleOnChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const decode = async () => {
        await userApi
            .get("/decode", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setUserId(response.data.data.id);
            });
    };

    const handleSummaryOrderData = async () => {
        const formattedDate = format(new Date(selectedDate), "dd-MM-yyyy");
        await orderApi
            .post("/summary", {
                userId: userId,
                date: formattedDate,
            })
            .then((response) => {
                setOrderData(response.data.data);
            });
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [orderId, setOrderId] = useState();
    const [orderDeleteData, setOrderDeleteData] = useState({});

    const openDeleteModal = async (e) => {
        // get the order id from the table row
        const tableRow = e.target.closest("tr").id;

        await orderApi
            .post("/detail", {
                orderId: tableRow,
            })
            .then((response) => {
                setOrderDeleteData(response.data.data);
            });
        setOrderId(tableRow);

        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setOrderId("");
        setOrderDeleteData({});
        setIsDeleteModalOpen(false);
    };

    const onDeleteConfirm = async (e) => {
        e.preventDefault();

        await orderApi
            .delete(`/order/${orderId}/${userId}`)
            .then((response) => {
                if (response.data.status === "error") {
                    alert("There was an error, please try again");
                } else {
                    setIsDeleteModalOpen(false);
                }
            });

        // update data order pada state setelah sebuah order data dihapus
        await handleSummaryOrderData();
    };

    useEffect(() => {
        decode();
    });

    return (
        <div className="max-h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col w-full px-20 py-10">
                {/* header date */}
                <div className="flex flex-col mb-3 w-full">
                    <h1 className="text-lg font-medium text-mainGray">
                        Selected date
                    </h1>
                    {selectedDate === "" ? (
                        <p className="text-mainRed text-lg">No date selected</p>
                    ) : (
                        <h1 className="text-mainGreen text-[24px] font-medium">
                            {getDayName(selectedDate)},{" "}
                            {selectedDate !== ""
                                ? format(new Date(selectedDate), "dd-MM-yyyy")
                                : ""}
                        </h1>
                    )}
                </div>

                {/* search */}
                <div className="w-full flex items-center gap-5 mb-3">
                    <input
                        type="date"
                        name="date"
                        placeholder="Select date"
                        className="flex justify-between text-mainGray font-semibold text-xl border border-mainGray rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                        value={selectedDate}
                        onChange={handleOnChange}
                    />
                    <button
                        onClick={handleSummaryOrderData}
                        className="border border-mainGreen bg-mainGreen rounded-xl text-xl text-mainWhite font-semibold px-6 py-2"
                    >
                        Filter
                    </button>
                </div>

                {/* table */}
                <div className="relative overflow-y-auto h-full w-full border border-mainDark">
                    <table className="w-full">
                        <thead>
                            <tr className="text-mainGreen font-bold text-[24px] leading-[60px]">
                                <th>Amount</th>
                                <th>Item Name</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {orderData?.length < 1 ? (
                            <tbody>
                                <p className="text-mainRed text-lg text-center">
                                    No data found
                                </p>
                            </tbody>
                        ) : (
                            <tbody>
                                {orderData?.map((order) => (
                                    <tr
                                        key={order._id}
                                        id={order._id}
                                        className="text-center text-[24px] font-normal text-mainGreen border border-b-mainGray border-t-transparent leading-[44px]"
                                    >
                                        <td>{order.amount}</td>
                                        <td>{order.name}</td>
                                        <td>{order.price}</td>
                                        <td>
                                            <button
                                                className="text-mainRed font-semibold"
                                                onClick={openDeleteModal}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            <DeleteOrderModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={onDeleteConfirm}
                orderData={orderDeleteData}
            />
        </div>
    );
}

export default Summary;
