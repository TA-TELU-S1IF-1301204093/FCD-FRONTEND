import React, { useEffect, useState } from "react";

// local import
import Sidebar from "../components/sidebar";
import userApi from "../api/user-api";

function Settings() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [userId, setUserId] = useState("");

    const [currentUser, setCurrentUser] = useState({});

    const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
                setCurrentUser(response.data.data);
            });
    };

    const handleClickUpdate = async (e) => {
        e.preventDefault();
        await userApi
            .put("/settings", {
                userId: userId,
                name: user.name === "" ? currentUser.name : user.name,
                email: user.email === "" ? currentUser.email : user.email,
                newPassword: user.password,
            })
            .then((response) => {
                // console.log(response.data.token);
                localStorage.removeItem("token");
                localStorage.setItem("token", response.data.token);
            })
            .catch((err) => {
                console.log(err);
            });

        decode();
        setUser({
            name: "",
            email: "",
            password: "",
        });
        window.location.reload(true);
    };

    useEffect(() => {
        decode();
    }, []);

    return (
        <div className="max-h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col w-full h-full items-center justify-center px-20 py-10 my-auto mx-auto">
                <form className="w-1/4 flex flex-col justify-around items-center gap-20">
                    <h1 className="text-4xl text-mainGreen font-bold text-center">
                        Edit Profile
                    </h1>
                    <div className="flex flex-col w-full items-center justify-around gap-5">
                        <div className="w-full flex flex-col justify-start gap-2">
                            <label
                                htmlFor="name"
                                className="text-xl text-mainGray font-normal"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder={
                                    currentUser
                                        ? currentUser.name
                                        : "Please enter your name"
                                }
                                value={user.name}
                                onChange={handleOnChange}
                                className="flex justify-between text-mainGray font-normal text-xl border rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                            />
                        </div>
                        <div className="w-full flex flex-col justify-start gap-2">
                            <label
                                htmlFor="email"
                                className="text-xl text-mainGray font-normal"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder={
                                    currentUser
                                        ? currentUser.email
                                        : "Please enter your email"
                                }
                                value={user.email}
                                onChange={handleOnChange}
                                className="flex justify-between text-mainGray font-normal text-xl border rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                            />
                        </div>

                        <div className="w-full flex flex-col justify-start gap-2">
                            <label
                                htmlFor="password"
                                className="text-xl text-mainGray font-normal"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="*****"
                                value={user.password}
                                onChange={handleOnChange}
                                className="flex justify-between text-mainGray font-normal text-xl border rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleClickUpdate}
                        className="border border-mainGreen bg-mainGreen rounded-xl text-xl text-mainWhite font-normal px-6 py-2 w-1/2 uppercase"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Settings;
