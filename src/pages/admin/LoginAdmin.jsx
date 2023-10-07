import React, { useState } from "react";

// local import
import AdminApi from "../../api/admin/AdminApi";
import FormInput from "../../components/form-input";
import AuthButton from "../../components/auth-button";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
    const navigate = new useNavigate();
    const [adminData, setAdminData] = useState({
        email: "",
        password: "",
    });

    const handleOnChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleLoginButton = async (e) => {
        e.preventDefault();
        await AdminApi.post("/login", {
            email: adminData.email,
            password: adminData.password,
        })
            .then((response) => {
                // console.log(response.data.token);
                if (response.data.status === "success") {
                    localStorage.setItem("adminToken", response.data.token);
                    navigate("/admin/dashboard");
                } else {
                    alert(response.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                console.clear();
            });
        setAdminData({
            email: "",
            password: "",
        });
    };

    return (
        <div className="w-screen h-screen bg-mainWhite flex items-center justify-center">
            <form className="flex flex-col gap-10 w-1/3">
                <h1 className="text-center text-mainGreen font-bold text-4xl">
                    Sign In to MNote <br /> Admin Dashboard
                </h1>
                <FormInput
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={adminData.email}
                    onChange={handleOnChange}
                    autoComplete="off"
                />
                <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={adminData.password}
                    onChange={handleOnChange}
                    autoComplete="off"
                />
                <AuthButton label="sign in" onClick={handleLoginButton} />
            </form>
        </div>
    );
}

export default LoginAdmin;
