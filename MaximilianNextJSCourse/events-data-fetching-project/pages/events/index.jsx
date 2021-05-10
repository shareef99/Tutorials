import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helper/api-util";

const AllEventsPage = ({ events }) => {
    const router = useRouter();

    function findEventHandler(year, month) {
        const fullPath = `events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </Fragment>
    );
};

export const getStaticProps = async () => {
    const events = await getAllEvents();

    return {
        props: {
            events,
            revalidate: 60,
        },
    };
};

export default AllEventsPage;
