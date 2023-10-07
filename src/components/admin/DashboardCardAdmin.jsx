import React from "react";

function DashboardCardAdmin({ label, value }) {
    return (
        <div className="w-full flex flex-col gap-5 text-center bg-mainWhite border border-mainGreen rounded-lg px-5 py-5">
            <h1 className="text-4xl text-mainGreen">{value}</h1>
            <p className="text-xl text-mainGray">{label}</p>
        </div>
    );
}

export default DashboardCardAdmin;
