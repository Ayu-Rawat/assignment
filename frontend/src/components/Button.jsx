import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-500 hover:bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            className={`px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}