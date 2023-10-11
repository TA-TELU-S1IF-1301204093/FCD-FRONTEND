import React from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";

function ManagePrice() {
    return (
        <div className="max-h-screen flex overflow-hidden">
            <SidebarAdmin />
            <div className="flex flex-col w-full px-20 py-10 bg-altWhite gap-5">
                <div className="flex items-center w-full justify-between">
                    <h1 className="text-lg font-medium text-mainGreen">
                        Manage Helps
                    </h1>
                </div>
                <div className="w-full flex flex-col items-center gap-7 overflow-y-auto"></div>
            </div>
        </div>
    );
}

export default ManagePrice;
