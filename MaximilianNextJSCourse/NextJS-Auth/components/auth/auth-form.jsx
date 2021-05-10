import { useRef, useState } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

async function createUser(email, password) {
    const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Something went wrong!!!");
    }

    return data;
}

function AuthForm() {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    function switchAuthModeHandler() {
        setIsLogin((prevState) => !prevState);
    }

    async function submitHandler(e) {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        if (isLogin) {
            // This promise never get rejected
            // Always return result
            // Incase of failing it return object with error message
            const result = await signIn("credentials", {
                redirect: false,
                // This email and password fields will be passes as params to next-auth authorize method
                email: enteredEmail,
                password: enteredPassword,
            });

            console.log(result);

            if (!result.error) {
                router.replace("/profile");
            }
        } else {
            try {
                const result = await createUser(enteredEmail, enteredPassword);
                console.log(result);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        ref={emailInputRef}
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputRef}
                    />
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? "Login" : "Create Account"}</button>
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;
