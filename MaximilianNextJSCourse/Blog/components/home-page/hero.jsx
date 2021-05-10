import Image from "next/image";
import classes from "../../styles/components/home-page/hero.module.css";

export default function Hero() {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image
                    src="/images/site/profile.jpg"
                    alt="Profile Picture"
                    width="300"
                    height="300"
                />
            </div>
            <h1>Hi, I'm Nadeem Shareef</h1>
            <p>
                I'm documenting the challenges I face while learning and
                teaching others to solve same problem with my Blogs
            </p>
        </section>
    );
}
