import React from "react";

function FormInput({ type, name, value, onChange, placeholder, autoComplete }) {
  return (
    <input
      type={type}
      name={name}
      className="h-[50px] border-none rounded-xl text-lg bg-altWhite outline-none px-5 placeholder:font-medium placeholder:text-lg text-mainDark"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
}

export default FormInput;
