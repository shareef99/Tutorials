import Link from "next/link";

const Client = () => {
    const clients = [
        { id: "shareef", name: "Shareef Bhai" },
        { id: "nadeem", name: "Nadeem Shareef" },
    ];

    return (
        <div>
            <h1>Hello from clients page</h1>
            <ul>
                {clients.map((client, index) => (
                    <li key={index}>
                        <Link
                            href={{
                                pathname: "/clients/[id]",
                                query: { id: client.id },
                            }}
                        >
                            <a>{client.name}</a>
                        </Link>
                        {/* <Link href={`/clients/${client.id}`}>
                            <a>{client.name}</a>
                        </Link> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Client;
