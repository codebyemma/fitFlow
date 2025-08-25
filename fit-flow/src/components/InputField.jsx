import React from "react";

const InputField = ({ label, type, value, onChange }) => {
    return (
        <div className="mb-3">
            <label
            className="block mb-1 font-semibold"
            >{label}</label>
            <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-2 border rounded focus: outline-none focus:ring-2 focus: ring-blue-400"
            required
            />
        </div>
    );
};

export default InputField;