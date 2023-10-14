import React, { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

function HelpCard({ data }) {
    const [isActive, setIsActive] = useState("");

    const handleActiveCard = (e) => {
        e.preventDefault();
        setIsActive(e.target.id);
    };

    return (
        <div
            className="w-full border border-mainGray shadow-lg shadow-altWhite rounded-lg py-7 px-10 flex flex-col gap-5"
            id={data._id}
        >
            <div
                className="
			flex items-center justify-between"
            >
                <h3 className="text-xl text-mainGreen font-semibold">
                    {data.question}
                </h3>
                {isActive === data._id ? (
                    <MdExpandLess
                        size={30}
                        onClick={() => setIsActive("")}
                        className="cursor-pointer text-mainRed"
                    />
                ) : (
                    <MdExpandMore
                        size={30}
                        onClick={handleActiveCard}
                        id={data._id}
                        className="cursor-pointer text-mainGreen"
                    />
                )}
            </div>
            <p
                className={
                    isActive === data._id
                        ? "flex text-lg text-mainGray text-justify"
                        : "hidden"
                }
                id={data._id}
            >
                {data.answer}
            </p>
        </div>
    );
}

export default HelpCard;
