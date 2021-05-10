import { useRef, useState } from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
    const emailInputRef = useRef();

    function registrationHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;

        fetch("/api/newsletter", {
            method: "POST",
            // We need to send data as JSON that's why we are using JSON.stringify
            // then pass it a JSON object
            body: JSON.stringify({ email: enteredEmail }),
            // It is equal to req.body.email
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data));

        // fetch user input (state or refs)
        // optional: validate input
        // send valid data to API
    }

    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Your email"
                        aria-label="Your email"
                        ref={emailInputRef}
                    />
                    <button>Register</button>
                </div>
            </form>
        </section>
    );
}

export default NewsletterRegistration;
