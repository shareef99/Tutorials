import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helper/api-util";

const EventDetailPage = ({ event }) => {
    if (!event) {
        return (
            <div className="center">
                <p>Loading...</p>;
            </div>
        );
    }

    return (
        <>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </>
    );
};

export const getStaticPaths = async () => {
    const allEvents = await getFeaturedEvents();
    const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps = async (context) => {
    const { params } = context;
    const eventId = params.eventId;
    const eventById = await getEventById(eventId);

    return {
        props: {
            event: eventById,
        },
        revalidate: 1800,
    };
};

export default EventDetailPage;
