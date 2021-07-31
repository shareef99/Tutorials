import Image from "next/image";
import classes from "../../../styles/components/posts/post-details/post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function PostContent({ post }) {
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        // img(image) {
        //     return (
        //         <Image
        //             src={`/images/posts/${post.slug}/${image.src}`}
        //             alt={image.alt}
        //             width="600"
        //             height="300"
        //         />
        //     );
        // },
        // p(paragraph) {
        //     const { node } = paragraph;
        //     if (node.children[0].type === "image") {
        //         const image = node.children[0];
        //         return (
        //             <div className={classes.image}>
        //                 <Image
        //                     src={`/images/posts/${post.slug}/${image.url}`}
        //                     alt={image.alt}
        //                     width="600"
        //                     height="300"
        //                 />
        //             </div>
        //         );
        //     }
        //     return <p>{paragraph.children}</p>;
        // },
        p: ({ node, children }) => {
            if (node.children[0].tagName === "img") {
                const image = node.children[0];
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.properties.alt}
                            width="600"
                            height="300"
                        />
                    </div>
                );
            }

            return <p>{children}</p>;
        },
        // code(code) {
        //     const { language, value } = code;
        //     return (
        //         <SyntaxHighlighter
        //             style={atomDark}
        //             language={language}
        //             children={value}
        //         />
        //     );
        // },

        code({ className, children }) {
            const language = className.replace("language-", "");

            return (
                <SyntaxHighlighter
                    style={atomDark}
                    language={language}
                    children={children[0]}
                />
            );
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>
                {post.content}
            </ReactMarkdown>
        </article>
    );
}
