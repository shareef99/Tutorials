import Link from "next/link";
import classes from "../../styles/components/ui/button.module.css";

function Button(props) {
    if (props.link) {
        return (
            <div>
                <Link href={props.link}>
                    <a className={classes.btn}>{props.children}</a>
                </Link>
            </div>
        );
    }

    return (
        <button className={classes.btn} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;
