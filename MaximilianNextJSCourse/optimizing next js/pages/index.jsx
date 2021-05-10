import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helper/api-util";

const Home = ({ featuredEvents }) => {
    return (
        <>
            <Head>
                <title>NextJS Events</title>
                <meta
                    name="description"
                    content="Find Events that can evolve you as a developer."
                />
            </Head>
            <div>
                <EventList items={featuredEvents} />
            </div>
        </>
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
