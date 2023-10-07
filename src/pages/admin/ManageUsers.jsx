import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

import SidebarAdmin from "../../components/admin/SidebarAdmin";
import DashboardCardAdmin from "../../components/admin/DashboardCardAdmin";
import AdminApi from "../../api/admin/AdminApi";

function ManageUsers() {
    const [accountData, setAccountData] = useState([]);
    const [totalAccount, setTotalAccount] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    const [totalAdmin, setTotalAdmin] = useState(0);

    const getAccountData = async () => {
        await AdminApi.get("/users", {
            headers: {
                Authorization: `jwt ${localStorage.getItem("adminToken")}`,
            },
        }).then((response) => {
            // console.log(response.data.data);

            setAccountData(response.data.data);
            setTotalAccount(response.data.data.length);
            setTotalUser(
                response.data.data.filter((item) => item.role === "user").length
            );
            setTotalAdmin(
                response.data.data.filter((item) => item.role === "admin")
                    .length
            );
        });
    };

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        // confirmation
        const confirmed = window.confirm(
            "Are you sure you want to delete this account?"
        );
        if (confirmed) {
            await AdminApi.delete("/users", {
                headers: {
                    Authorization: `jwt ${localStorage.getItem("adminToken")}`,
                },
                data: {
                    userId: e.target.id,
                },
            });
        }
    };
    const handleEditClick = async () => {};

    useEffect(() => {
        getAccountData();
    }, [accountData]);

    return (
        <div className="max-h-screen flex overflow-hidden">
            <SidebarAdmin />
            <div className="flex flex-col w-full px-20 py-10 bg-altWhite gap-5">
                <div className="flex items-center w-full">
                    <h1 className="text-lg font-medium text-mainGreen">
                        Manage Users
                    </h1>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    <DashboardCardAdmin
                        label="Total Accounts"
                        value={totalAccount}
                    />
                    <DashboardCardAdmin
                        label="Total Admin"
                        value={totalAdmin}
                    />
                    <DashboardCardAdmin label="Total User" value={totalUser} />
                </div>
                <div className="relative overflow-y-auto h-full w-full border border-mainGreen rounded-lg bg-mainWhite">
                    <table className="w-full">
                        <thead>
                            <tr className="text-mainGreen font-bold text-2xl leading-loose">
                                <th>ID</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>ROLE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountData?.map((acc) => (
                                <tr
                                    key={acc._id}
                                    className="text-center text-lg font-normal text-mainDark border border-b-mainGray border-t-transparent leading-[44px]"
                                >
                                    <td>{acc._id}</td>
                                    <td>{acc.name}</td>
                                    <td>{acc.email}</td>
                                    <td>{acc.role}</td>
                                    <td>
                                        <MdOutlineDeleteOutline
                                            size={30}
                                            id={acc._id}
                                            className="text-mainRed relative mx-auto cursor-pointer"
                                            onClick={handleDeleteClick}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
