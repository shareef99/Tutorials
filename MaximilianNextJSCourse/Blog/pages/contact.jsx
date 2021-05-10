import Head from "next/head";
import ContactForm from "../components/contact/contact-form";

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact | Shareef</title>
                <meta
                    name="description"
                    content="Contact page of shareef blog."
                />
            </Head>
            <ContactForm />
        </>
    );
}
