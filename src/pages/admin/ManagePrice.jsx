import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import AdminApi from "../../api/admin/AdminApi";
import { IoMdAdd } from "react-icons/io";
import AddPriceModal from "../../components/admin/AddPriceModal";
import UpdatePriceModal from "../../components/admin/UpdatePriceModal";

function ManagePrice() {
    const [priceData, setPriceData] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [orderId, setOrderId] = useState();
    const [orderName, setOrderName] = useState();
    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };
    const openUpdateModal = (e) => {
        setOrderId(e.target.id);
        setOrderName(e.target.name);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const getAllPriceData = async () => {
        await AdminApi.get("/orders/price", {
            headers: {
                Authorization: `jwt ${localStorage.getItem("adminToken")}`,
            },
        })
            .then((response) => {
                setPriceData(response.data.data.reverse());
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        getAllPriceData();
    }, [priceData]);
    return (
        <div className="max-h-screen flex overflow-hidden">
            <SidebarAdmin />
            <div className="flex flex-col w-full px-20 py-10 bg-altWhite gap-5">
                <div className="flex items-center w-full justify-between">
                    <h1 className="text-lg font-medium text-mainGreen">
                        Manage Helps
                    </h1>
                </div>
                <div className="relative overflow-y-auto h-full w-full border border-mainGreen rounded-lg bg-mainWhite">
                    <table className="w-full">
                        <thead>
                            <tr className="text-mainGreen font-bold text-2xl leading-loose">
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {priceData?.map((data) => (
                                <tr
                                    key={data._id}
                                    id={data._id}
                                    className="text-center text-lg font-normal text-mainDark border border-b-mainGray border-t-transparent leading-[44px]"
                                >
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                    <td>
                                        <button
                                            className="text-mainGreen cursor-pointer hover:scale-105 transition-all duration-75"
                                            onClick={openUpdateModal}
                                            id={data._id}
                                            name={data.name}
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex flex-row-reverse mt-3">
                    <IoMdAdd
                        size={46}
                        className="bg-mainGreen rounded-full text-mainWhite transition-all hover:scale-105 cursor-pointer"
                        onClick={openAddModal}
                    />
                </div>
            </div>
            <AddPriceModal isOpen={isAddModalOpen} onClose={closeAddModal} />
            <UpdatePriceModal
                isOpen={isUpdateModalOpen}
                onClose={closeUpdateModal}
                orderId={orderId}
                itemName={orderName}
            />
        </div>
    );
}

export default ManagePrice;
