import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import helpApi from "../../api/help-api";
import AddHelpModal from "../../components/admin/AddHelpModal";
import HelpCardAdmin from "../../components/admin/HelpCardAdmin";

function ManageHelp() {
    const [helpData, setHelpData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchHelpData = async () => {
        await helpApi.get("/").then((response) => {
            setHelpData(response.data.data.reverse());
        });
    };

    const openAddModal = () => {
        setIsModalOpen(true);
    };

    const closeAddModal = () => {
        setIsModalOpen(false);
    };

    const deleteAllHelpData = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete all help data? (this can't be undone)"
        );

        if (confirmed) {
            await helpApi.delete("/", {
                headers: {
                    Authorization: `jwt ${localStorage.getItem("adminToken")}`,
                },
            });
            window.location.reload();
        }
    };

    useEffect(() => {
        fetchHelpData();
    }, [helpData]);

    return (
        <div className="max-h-screen flex overflow-hidden">
            <SidebarAdmin />
            <div className="flex flex-col w-full px-20 py-10 bg-altWhite gap-5">
                <div className="flex items-center w-full justify-between">
                    <h1 className="text-lg font-medium text-mainGreen">
                        Manage Helps
                    </h1>
                    <div className="flex items-center gap-5">
                        {/* <button>Delete All</button> */}
                        <button
                            className="text-mainWhite border border-mainGreen bg-mainGreen px-4 py-1 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-75"
                            onClick={openAddModal}
                        >
                            Add Help Data
                        </button>
                        <button
                            className="text-mainWhite border border-mainRed bg-mainRed px-4 py-1 rounded-lg font-semibold text-lg hover:scale-105 transition-all duration-75"
                            onClick={deleteAllHelpData}
                        >
                            Delete all
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center gap-7 overflow-y-auto">
                    {helpData?.length > 0 ? (
                        helpData.map((help) => (
                            <HelpCardAdmin data={help} key={help._id} />
                        ))
                    ) : (
                        <p className="text-mainRed">Empty data</p>
                    )}
                </div>
            </div>
            <AddHelpModal isOpen={isModalOpen} onClose={closeAddModal} />
        </div>
    );
}

export default ManageHelp;
