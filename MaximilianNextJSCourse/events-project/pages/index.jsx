import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const Home = () => {
    const featureEvents = getFeaturedEvents();

    return (
        <div>
            <EventList items={featureEvents} />
        </div>
    );
};

export default Home;
