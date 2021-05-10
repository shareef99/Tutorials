import React, { useState } from "react";
import ProgressBar from "../comps/ProgressBar";

export default function UploadForm() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const changeHandler = (e) => {
        const selected = e.target.files[0];
        const types = ["image/jpeg", "image/png"];

        if (selected && types.includes(selected.type)) {
            setError("");
            setFile(selected);
        } else {
            setFile(null);
            setError(`Type must be jpeg or png\nYour type is ${selected.type}`);
        }
    };

    return (
        <>
            <form>
                <label>
                    <input type="file" onChange={changeHandler} />
                    <span>+</span>
                </label>
            </form>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div className="file">{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </>
    );
}
