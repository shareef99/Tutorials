import Link from "next/link";

const Home = () => {
    return (
        <>
            <h1>Hello World!</h1>
            <ul>
                <li>
                    <Link href="/portfolio">
                        <a>Portfolio</a>
                    </Link>
                </li>
                <li>
                    <Link href="/clients">
                        <a>Clients</a>
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default Home;
