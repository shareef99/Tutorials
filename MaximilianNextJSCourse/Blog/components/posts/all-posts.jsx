import classes from "../../styles/components/posts/all-posts.module.css";
import PostGrid from "./post-grid";

export default function AllPosts({ posts }) {
    return (
        <section className={classes.posts}>
            <h1>All Posts</h1>
            <PostGrid posts={posts} />
        </section>
    );
}
