import React, { useState } from "react";
import helpApi from "../../api/help-api";

function AddHelpModal({ onClose, isOpen }) {
    if (!isOpen) return null;

    const [helpInput, setHelpInput] = useState({
        question: "",
        answer: "",
    });

    const handleOnChange = (e) => {
        setHelpInput({ ...helpInput, [e.target.name]: e.target.value });
    };

    // handle add
    const handleAddHelpData = async (e) => {
        e.preventDefault();

        await helpApi.post(
            "/",
            {
                question: helpInput.question,
                answer: helpInput.answer,
            },
            {
                headers: {
                    Authorization: `jwt ${localStorage.getItem("adminToken")}`,
                },
            }
        );
        setHelpInput({
            question: "",
            answer: "",
        });
        onClose();
    };

    return (
        <div className="fixed w-full h-full bg-mainGray bg-opacity-50 flex justify-center items-center z-1000">
            <form className="bg-mainWhite p-20 rounded-md w-1/3 h-1/2 flex flex-col items-center">
                <h2 className="text-mainGreen font-bold text-[42px] text-center">
                    Input Help Data
                </h2>
                <div className="mt-10 px-20 w-full flex flex-col gap-5 items-center">
                    <input
                        type="text"
                        name="question"
                        onChange={handleOnChange}
                        value={helpInput.question}
                        className="flex w-full justify-between text-mainGray font-semibold text-xl border border-mainGray rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                        placeholder="Input question"
                    />
                    <input
                        type="text"
                        name="answer"
                        onChange={handleOnChange}
                        value={helpInput.answer}
                        className="flex w-full justify-between text-mainGray font-semibold text-xl border border-mainGray rounded-lg px-5 py-2 bg-altWhite focus:outline-mainGray placeholder:text-lg"
                        placeholder="Input answer"
                    />
                </div>
                <div className="mt-10 w-full h-auto flex items-center justify-evenly">
                    <button
                        onClick={onClose}
                        className="border border-mainRed rounded-lg text-xl text-mainRed font-semibold px-5 py-1"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddHelpData}
                        className="border border-mainGreen bg-mainGreen rounded-lg text-xl text-mainWhite font-semibold px-5 py-1"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddHelpModal;
