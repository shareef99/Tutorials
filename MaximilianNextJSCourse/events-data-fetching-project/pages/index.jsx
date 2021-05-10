import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helper/api-util";
const Home = ({ featuredEvents }) => {
    return (
        <div>
            <EventList items={featuredEvents} />
        </div>
    );
};

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            featuredEvents,
        },
        revalidate: 30,
    };
};

export default Home;
