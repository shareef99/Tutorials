import React from "react";

export default function Model({ selectedImg, setSelectedImg }) {
    const handleClick = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImg(null);
        }
    };

    return (
        <div className="backdrop" onClick={handleClick}>
            <img src={selectedImg} alt="Enlarge pic" />
        </div>
    );
}
