export default function Home() {
    async function handleClick() {
        fetch("/api/drive", {
            method: "POST",
            body: JSON.stringify({
                image: `/images/context-api-with-nextjs-and-typescript-3.jpg`,
            }),
        });
    }

    return (
        <>
            <h1>Hello Master Shareef</h1>
            <button onClick={handleClick}>Upload File</button>
        </>
    );
}
