import React, { useEffect, useState } from "react";

// local import
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import AdminApi from "../../api/admin/AdminApi";
import DashboardCardAdmin from "../../components/admin/DashboardCardAdmin";
import userApi from "../../api/user-api";

function DashboardAdmin() {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [orderData, setOrderData] = useState();
    const [decodedNames, setDecodedNames] = useState([]);

    const fetchOrderData = async () => {
        await AdminApi.get("/orders", {
            headers: {
                Authorization: `jwt ${localStorage.getItem("adminToken")}`,
            },
        }).then((response) => {
            setOrderData(response.data.data);

            var totalOrders = 0;
            for (const order of response.data.data) {
                totalOrders += order.amount;
            }

            setTotalOrders(totalOrders);
            var total = 0;
            for (const item of response.data.data) {
                total += item.price;
            }
            setTotalIncome(total);
        });
    };

    const decode = async (userId) => {
        const result = await userApi.post("/", {
            userId: userId,
        });
        const ordersUser = await userApi.get("/decode", {
            headers: {
                Authorization: result.data.token,
            },
        });
        return ordersUser.data.data.name;
    };

    useEffect(() => {
        fetchOrderData();
        const fetchNames = async () => {
            if (orderData && orderData.length > 0) {
                const decodedNames = await Promise.all(
                    orderData?.map(async (order) => {
                        const decodedName = await decode(order.user);
                        return decodedName;
                    })
                );

                setDecodedNames(decodedNames);
            }
        };
        fetchNames();
    }, [orderData]);

    return (
        <div className="max-h-screen flex overflow-hidden">
            <SidebarAdmin />
            <div className="flex flex-col w-full px-20 py-10 bg-altWhite gap-5">
                <div className="flex items-center w-full">
                    <h1 className="text-lg font-medium text-mainGreen">
                        Dashboard
                    </h1>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    <DashboardCardAdmin
                        label="Total Orders"
                        value={totalOrders}
                    />
                    <DashboardCardAdmin
                        label="Total Income"
                        value={totalIncome}
                    />
                </div>
                <div className="relative overflow-y-auto h-full w-full border border-mainGreen rounded-lg bg-mainWhite">
                    <table className="w-full">
                        <thead>
                            <tr className="text-mainGreen font-bold text-2xl leading-loose">
                                <th>Amount</th>
                                <th>Item Name</th>
                                <th>Total Price</th>
                                <th>Date</th>
                                <th>Cashier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData?.map((order, index) => (
                                <tr
                                    key={order._id}
                                    id={order._id}
                                    className="text-center text-lg font-normal text-mainDark border border-b-mainGray border-t-transparent leading-[44px]"
                                >
                                    <td>{order.amount}</td>
                                    <td>{order.name}</td>
                                    <td>{order.price}</td>
                                    <td>{order.date}</td>
                                    <td>{decodedNames[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;
