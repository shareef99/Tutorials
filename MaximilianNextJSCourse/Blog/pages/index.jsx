import Head from "next/head";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../lib/posts-util";

export default function HomePage({ posts }) {
    return (
        <Fragment>
            <Head>
                <title>Shareef Blog</title>
                <meta
                    name="description"
                    content={`I'm documenting the challenges I face while learning and teaching others to 
                        solve same problem with my Blogs`}
                />
            </Head>
            <Hero />
            <FeaturedPosts posts={posts} />
        </Fragment>
    );
}

export const getStaticProps = async () => {
    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts,
        },
    };
};
