import { useRouter } from "next/router";

const ProjectPage = () => {
    const router = useRouter();

    console.log(router.pathname);
    console.log(router.query);

    return (
        <div>
            <h1>Hello from Dash</h1>
        </div>
    );
};

export default ProjectPage;
