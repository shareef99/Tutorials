import PostGrid from "../posts/post-grid";
import classes from "../../styles/components/home-page/featured-posts.module.css";

export default function FeaturedPosts({ posts }) {
    return (
        <section className={classes.latest}>
            <h2>Featured Posts</h2>
            <PostGrid posts={posts} />
        </section>
    );
}
