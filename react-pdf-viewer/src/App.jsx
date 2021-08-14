import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { subjects } from "./notes";

export const App = () => {
    const [collections, setCollection] = useState();

    useEffect(() => {
        db.collection("pdfs").onSnapshot((snap) => {
            let collections = [];
            snap.forEach((doc) => {
                collections.push({ ...doc.data(), id: doc.id });
            });
            setCollection(collections);
        });
    }, []);

    console.log(subjects);

    const handleFile = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        const file = e.target.files[0];

        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                // setPdf(e.target.result);
                // db.collection("pdfs").add({
                //     name: file.name,
                //     size: file.size,
                //     pdfData: e.target.result,
                // });
                const notes = subjects
                    .find((x) => x.subjectName === "Maths")
                    .subjectNotes.find((x) => x.type === "notes").notes;

                console.log(notes);
                console.log(notes.push({ name: "males" }));

                console.log(notes);
            };
        } else {
            console.log("No file");
        }
    };

    return (
        <section>
            <form>
                <input type="file" onChange={handleFile} />
            </form>
            <div className="pdf-container">
                {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={collections[1]?.pdfData}
                        plugins={[defaultLayoutPlugin]}
                    />
                </Worker> */}
            </div>
        </section>
    );
};

export default App;
