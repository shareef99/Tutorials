import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

export default function AllPostsPage({ posts }) {
    return (
        <>
            <Head>
                <title>All posts | Shareef</title>
                <meta name="description" content="All my posts" />
            </Head>
            <AllPosts posts={posts} />
        </>
    );
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts();

    return {
        props: {
            posts: allPosts,
        },
    };
};
