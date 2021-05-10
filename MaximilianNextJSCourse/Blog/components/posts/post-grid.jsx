import classes from "../../styles/components/posts/post-grid.module.css";
import PostItem from "./post-item";

export default function PostGrid({ posts }) {
    return (
        <ul className={classes.grid}>
            {posts.map((post) => (
                <PostItem key={post.slug} post={post} />
            ))}
        </ul>
    );
}
