import { useEffect, useState } from "react";
import classes from "../../styles/components/contact/contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetails) {
    const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(contactDetails),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
    }
}

const ContactForm = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredName, setEnteredName] = useState("");
    const [enteredMessage, setEnteredMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState();
    // 'pending', 'error', 'success', undefined
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === "success" || requestStatus === "error") {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setRequestError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    async function sendMessageHandler(e) {
        e.preventDefault();

        setRequestStatus("pending");

        try {
            await sendContactData({
                email: enteredEmail,
                name: enteredName,
                message: enteredMessage,
            });

            setRequestStatus("success");
        } catch (err) {
            setRequestError(err.message);
            setRequestStatus("error");
        }
    }

    let notification;

    if (requestStatus === "pending") {
        notification = {
            status: "pending",
            title: "Sending message...",
            message: "Your message is on its way!",
        };
    } else if (requestStatus === "success") {
        notification = {
            status: "success",
            title: "Success!",
            message: "Message send successfully!",
        };
    } else if (requestStatus === "error") {
        notification = {
            status: "error",
            title: "Error!",
            message: requestError,
        };
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form
                action=""
                className={classes.form}
                onSubmit={sendMessageHandler}
            >
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={enteredEmail}
                            onChange={(e) => setEnteredEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={enteredName}
                            onChange={(e) => setEnteredName(e.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows="5"
                        required
                        value={enteredMessage}
                        onChange={(e) => setEnteredMessage(e.target.value)}
                    />
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
        </section>
    );
};

export default ContactForm;
