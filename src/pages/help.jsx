import React, { useEffect, useState } from "react";

// local import
import Sidebar from "../components/sidebar";
import HelpCard from "../components/help-card";
import helpApi from "../api/help-api";

function Help() {
    const [helpData, setHelpData] = useState();

    const fetchHelpData = async () => {
        await helpApi.get("/").then((response) => {
            setHelpData(response.data.data.reverse());
        });
    };

    useEffect(() => {
        fetchHelpData();
    }, [helpData]);

    return (
        <div className="max-h-screen flex overflow-hidden">
            <Sidebar />
            <div className="flex flex-col w-full px-20 py-10">
                <h1 className="text-mainGreen text-3xl text-center font-bold">
                    Frequently Asked Questions
                </h1>
                <div className="w-full flex flex-col items-center gap-7 mt-10 overflow-y-auto">
                    {/* card goes here */}
                    {helpData?.length > 0 ? (
                        helpData.map((help) => (
                            <HelpCard data={help} key={help._id} />
                        ))
                    ) : (
                        <p className="text-mainRed">Empty data</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Help;
