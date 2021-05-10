import Image from "next/image";
import classes from "../../styles/components/events/event-item.module.css";
import Button from "../ui/button";
import {
    HiOutlineCalendar,
    HiOutlineLocationMarker,
    HiArrowNarrowRight,
} from "react-icons/hi";

const EventItem = (props) => {
    const { id, title, image, date, location } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const formattedAddress = location.replace(", ", "\n");
    const exploreLink = `/events/${id}`;

    return (
        <li className={classes.item}>
            <Image src={"/" + image} alt={title} width="250" height="160" />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <HiOutlineCalendar />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <HiOutlineLocationMarker />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span>Explore Link</span>
                        <span className={classes.icon}>
                            <HiArrowNarrowRight />
                        </span>
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default EventItem;
