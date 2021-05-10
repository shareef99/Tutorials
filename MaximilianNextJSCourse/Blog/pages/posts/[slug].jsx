import Head from "next/head";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-details/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

export default function PostDetailsPage({ post }) {
    return (
        <Fragment>
            <Head>
                <title>{post.title} | Shareef</title>
                <meta name="description" content={post.excerpt} />
            </Head>
            <PostContent post={post} />
        </Fragment>
    );
}

export const getStaticProps = async (context) => {
    const { params } = context;
    const { slug } = params;

    const postData = getPostData(slug);

    return {
        props: {
            post: postData,
        },
        // regenerate after every 600s(10mins)
        revalidate: 600,
    };
};

export const getStaticPaths = async () => {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map((fileName) =>
        fileName.replace(/\.md$/, "")
    );

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };
};
