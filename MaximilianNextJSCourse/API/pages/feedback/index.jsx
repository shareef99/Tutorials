import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback/index";

const FeedbackPage = ({ feedbackItems }) => {
    const [feedbackData, setFeedbackData] = useState();

    const loadFeedbackHandler = (id) => {
        fetch(`/api/feedback/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setFeedbackData(data.feedback);
            });
    };

    return (
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {feedbackItems.map((item) => (
                    <li key={item.id}>
                        {item.text}{" "}
                        <button
                            onClick={loadFeedbackHandler.bind(null, item.id)}
                        >
                            show details
                        </button>{" "}
                    </li>
                ))}
            </ul>
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    return {
        props: {
            feedbackItems: data,
        },
    };
};

export default FeedbackPage;
