import LogisticsItem from "./logistics-item";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import classes from "../../styles/components/event-detail/event-logistics.module.css";

function EventLogistics(props) {
    const { date, address, image, imageAlt } = props;

    const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const addressText = address.replace(", ", "\n");

    return (
        <section className={classes.logistics}>
            <div className={classes.image}>
                <img src={`/${image}`} alt={imageAlt} />
            </div>
            <ul className={classes.list}>
                <LogisticsItem icon={HiOutlineCalendar}>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem icon={HiOutlineLocationMarker}>
                    <address>{addressText}</address>
                </LogisticsItem>
            </ul>
        </section>
    );
}

export default EventLogistics;
