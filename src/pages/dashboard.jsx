import React, { useEffect, useState } from "react";
import orderApi from "../api/order-api.js";
import userApi from "../api/user-api.js";
import Sidebar from "../components/sidebar";
import DeleteOrderModal from "../components/delete-order-modal.jsx";

import { IoMdAdd } from "react-icons/io";
import AddOrderModal from "../components/add-order-modal.jsx";

function Dashboard() {
    const [orders, setOrders] = useState([]);

    const [currentDate, setCurrentDate] = useState("");
    const [dayName, setDayName] = useState("");

    const [totalOrder, setTotalOrder] = useState(0);

    const [userId, setUserId] = useState();

    // get the orderId to be deleted
    const [orderId, setOrderId] = useState();
    const [orderDeleteData, setOrderDeleteData] = useState();

    // modal delet
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const customFormatDate = () => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const currentDate = new Date();
        const day = currentDate.getDate();
        const monthIndex = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const formattedDate = `${day} ${months[monthIndex]} ${year}`;
        setCurrentDate(formattedDate);
    };

    const getDayName = () => {
        var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        var d = new Date();
        setDayName(days[d.getDay()]);
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

    const fetchOrder = async () => {
        await orderApi
            .post("/", {
                userId: userId,
            })
            .then((response) => {
                setOrders(response.data.data.reverse());
            });
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
    };

    const countTotalOrders = () => {
        var countedTotalOrder = 0;
        for (const order of orders) {
            countedTotalOrder += order.amount;
        }

        setTotalOrder(countedTotalOrder);
    };

    useEffect(() => {
        getDayName();
        customFormatDate();
        const interval = setInterval(() => {
            decode();
            fetchOrder();
            countTotalOrders();
        }, 1000);
        return () => clearInterval(interval);
    }, [orders]);

    return (
        <div className="max-h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col w-full px-20 py-10">
                <div className="flex mb-5 items-center w-full">
                    <h1 className="text-mainGreen text-[24px] font-medium">
                        {dayName}, {currentDate}
                    </h1>
                </div>
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
                        <tbody>
                            {orders.map((order) => (
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
                                            className="text-mainRed"
                                            onClick={openDeleteModal}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-between items-center border border-mainDark mt-5 px-20">
                    <h1 className="font-bold text-mainGreen text-[24px]">
                        Total Orders
                    </h1>
                    <h1 className="font-bold text-mainGreen text-[24px]">
                        {totalOrder}
                    </h1>
                </div>
                <div className="w-full flex flex-row-reverse mt-3">
                    <IoMdAdd
                        size={46}
                        className="bg-mainGreen rounded-full text-mainWhite transition-all hover:scale-105 cursor-pointer"
                        onClick={openAddModal}
                    />
                </div>
            </div>
            <DeleteOrderModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={onDeleteConfirm}
                orderData={orderDeleteData}
            />
            <AddOrderModal
                isOpen={isAddModalOpen}
                onClose={closeAddModal}
                userId={userId}
            />
        </div>
    );
}

export default Dashboard;
