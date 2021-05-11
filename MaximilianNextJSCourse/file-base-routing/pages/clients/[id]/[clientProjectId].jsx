import { useRouter } from "next/router";

const SpecificClientProject = () => {
    const router = useRouter();

    console.log(router.query);

    return (
        <div>
            <h1>Hello from the specific client projects</h1>
        </div>
    );
};

export default SpecificClientProject;
