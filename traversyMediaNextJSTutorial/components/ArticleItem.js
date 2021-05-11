import Link from "next/link";

function ArticleItem({ article }) {
    return (
        <div>
            <Link href="article/[id]" as={`article/${article.id}`}>
                <a>
                    <h3>{article.title}</h3>
                </a>
            </Link>
            <p>{article.body}</p>
        </div>
    );
}

export default ArticleItem;
