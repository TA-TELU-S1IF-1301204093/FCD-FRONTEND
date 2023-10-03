import React, { useEffect, useState } from "react";
import userApi from "../api/user-api";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const [pathname, setPathname] = useState("");

    const navigate = useNavigate();

    const [user, setUser] = useState("");

    const decodeUserToken = async () => {
        await userApi
            .get("/decode", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                // console.log(response);
                setUser(response.data.data.name);
            });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate("/");
    };

    useEffect(() => {
        setPathname(window.location.pathname);
        decodeUserToken();
    }, []);
    return (
        <div className="flex flex-col w-[250px] h-screen justify-between border border-r-mainGray border-opacity-50">
            <div className="flex items-center justify-center border border-b-mainGray border-opacity-50 border-t-transparent border-r-transparent border-l-transparent hfull">
                <h1 className="text-mainGreen text-[42px] font-bold">MNote</h1>
            </div>
            <div className="flex flex-col justify-between w-full h-full pt-5">
                <div className="w-full">
                    <ul className="text-center flex flex-col gap-3 w-[90%]">
                        <li
                            className={
                                pathname === "/dashboard"
                                    ? "bg-mainGreen rounded-r-lg text-[24px] text-mainWhite py-2"
                                    : "text-[24px] text-mainGray py-2"
                            }
                        >
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li
                            className={
                                pathname === "/summary"
                                    ? "bg-mainGreen rounded-r-lg text-[24px] text-mainWhite py-2"
                                    : "text-[24px] text-mainGray py-2"
                            }
                        >
                            <a href="/summary">Summary</a>
                        </li>
                        <li
                            className={
                                pathname === "/search"
                                    ? "bg-mainGreen rounded-r-lg text-[24px] text-mainWhite py-2"
                                    : "text-[24px] text-mainGray py-2"
                            }
                        >
                            <a href="/search">Search</a>
                        </li>
                        <li
                            className={
                                pathname === "/settings"
                                    ? "bg-mainGreen rounded-r-lg text-[24px] text-mainWhite py-2"
                                    : "text-[24px] text-mainGray py-2"
                            }
                        >
                            <a href="/settings">Settings</a>
                        </li>
                        <li
                            className={
                                pathname === "/help"
                                    ? "bg-mainGreen rounded-r-lg text-[24px] text-mainWhite py-2"
                                    : "text-[24px] text-mainGray py-2"
                            }
                        >
                            <a href="/help">Help</a>
                        </li>
                    </ul>
                </div>
                <div className="w-full text-center text-[18px] pb-5">
                    <h3 className="font-semibold text-mainGreen mb-2 uppercase">
                        {user}
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

export default Sidebar;
