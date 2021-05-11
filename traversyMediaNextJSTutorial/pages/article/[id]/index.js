import Link from "next/link";

export default function article({ article }) {
    return (
        <div>
            <h3>{article.title}</h3>
            <p>{article.body}</p>
            <br />
            <Link href="/">
                <a>GO to home</a>
            </Link>
        </div>
    );
}

export const getStaticProps = async (context) => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
    );

    const article = await res.json();

    return {
        props: {
            article,
        },
    };
};

export const getStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const articles = await res.json();

    const ids = articles.map((article) => article.id);
    const paths = ids.map((id) => ({ params: { id: id.toString() } }));

    return {
        paths,
        fallback: false,
    };
};
