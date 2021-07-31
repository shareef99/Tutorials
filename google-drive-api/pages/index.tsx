import { useState } from "react";
import axios from "axios";

export default function Home() {
    // States
    const [file, setFile] = useState<File>();

    // Handle functions
    async function handleClick() {
        try {
            axios.post("/api/drive", {
                shareef: "master",
            });
        } catch (err) {
            console.log(err.message || err);
        }
        // axios({
        //     method: "post",
        //     url: "/api/drive",
        //     data: "Shareef",

        //     headers: {
        //         "Content-Type": `${file?.type}`,
        //         "Content-Length": `${file?.size}`,
        //     },
        // });
        // fetch(
        //     "https://www.googleapis.com/upload/drive/v3/files?uploadType=media",
        //     {
        //         method: "POST",
        //         body: JSON.stringify({
        //             files: file,
        //         }),
        //         headers: {
        //             "Content-Type": `${file?.type}`,
        //             "Content-Length": `${file?.size}`,
        //         },
        //     }
        // );
    }

    function handleFileUpload(e: any) {
        e.preventDefault();
        console.log({
            event: e,
            target: e.target,
            files: e.target.files,
            file: e.target.files[0],
        });

        setFile(e.target.files[0]);
    }

    return (
        <>
            <h1>Hello Master Shareef</h1>
            <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileUpload}
            />
            <button onClick={handleClick}>Upload File</button>
        </>
    );
}
