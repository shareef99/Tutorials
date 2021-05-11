import { useRouter } from "next/router";

const ClientProjectsPage = () => {
    const router = useRouter();

    console.log(router.query);

    const handleClick = () => {
        // router.push(`/clients/shareef/projects`);
        router.push({
            pathname: "/clients/[id]/[clientProjectId]",
            query: { id: router.query.id, clientProjectId: "projects" },
        });
    };

    return (
        <div>
            <h1>Hello from clients projects page</h1>
            <button onClick={handleClick}>Go to Projects</button>
        </div>
    );
};

export default ClientProjectsPage;
