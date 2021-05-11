import ArticleItem from "../components/ArticleItem";

function ArticleList({ articles }) {
    return (
        <div>
            {articles.map((article) => (
                <ArticleItem article={article} />
            ))}
        </div>
    );
}

export default ArticleList;
