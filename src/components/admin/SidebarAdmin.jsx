import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../api/user-api";

function SidebarAdmin() {
    const [pathName, setPathName] = useState("");
    const [admin, setAdmin] = useState();
    const navigate = useNavigate();

    const decodeToken = async () => {
        await userApi
            .get("/decode", {
                headers: {
                    Authorization: localStorage.getItem("adminToken"),
                },
            })
            .then((response) => {
                setAdmin(response.data.data.name);
            });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    useEffect(() => {
        setPathName(window.location.pathname);
        decodeToken();
    }, []);

    return (
        <div className="flex flex-col w-[250px] h-screen justify-between ">
            <div className="flex items-center justify-center  hfull">
                <h1 className="text-mainGreen text-[42px] font-bold">MNote</h1>
            </div>
            <div className="flex flex-col justify-between w-full h-full pt-5">
                <div className="w-full">
                    <ul className="text-center flex flex-col gap-3 w-[90%]">
                        <li
                            className={
                                pathName === "/admin/dashboard"
                                    ? "text-mainGreen font-bold text-xl py-2 border-r-mainGreen border-r-4 border border-l-transparent border-t-transparent border-b-transparent"
                                    : "text-mainGray font-normal text-xl py-2"
                            }
                        >
                            <a href="/admin/dashboard">Dashboard</a>
                        </li>
                        <li
                            className={
                                pathName === "/admin/manage-users"
                                    ? "text-mainGreen font-bold text-xl py-2 border-r-mainGreen border-r-4 border border-l-transparent border-t-transparent border-b-transparent"
                                    : "text-mainGray font-normal text-xl py-2"
                            }
                        >
                            <a href="/admin/manage-users">Manage Users</a>
                        </li>
                        <li
                            className={
                                pathName === "/admin/manage-orders"
                                    ? "text-mainGreen font-bold text-xl py-2 border-r-mainGreen border-r-4 border border-l-transparent border-t-transparent border-b-transparent"
                                    : "text-mainGray font-normal text-xl py-2"
                            }
                        >
                            <a href="/admin/manage-orders">Manage Orders</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full text-center text-[18px] pb-5">
                    <h3 className="font-semibold text-mainGreen mb-2 uppercase">
                        {admin}
                    </h3>
                    <button
                        className="border border-mainGreen text-mainRed rounded-full px-8 py-1 font-semibold"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SidebarAdmin;
