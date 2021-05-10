import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
// import { getFilteredEvents } from "../../helper/api-util";

const FilterEventsPage = () => {
    const [events, setEvents] = useState();
    const router = useRouter();

    const filterData = router.query.slug;

    const { data, error } = useSWR(
        "https://nextjs-dummy-backend-d1fe2-default-rtdb.firebaseio.com/events.json"
    );

    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }
            setEvents(events);
        }
    }, [data]);

    let pageMetaTag = (
        <Head>
            <title>Filter Events</title>
            <meta name="description" content={`List of all events.`} />
        </Head>
    );

    if (!events) {
        return (
            <>
                {pageMetaTag}
                <p className="center">Loading...</p>
            </>
        );
    }

    const [filterYear, filterMonth] = filterData;

    const numYear = +filterYear;
    const numMonth = +filterMonth;

    pageMetaTag = (
        <Head>
            <title>Filter Events</title>
            <meta
                name="description"
                content={`All events for ${numMonth}/${numYear}.`}
            />
        </Head>
    );

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12 ||
        error
    ) {
        return (
            <Fragment>
                {pageMetaTag}
                <ErrorAlert>
                    <p className="center"> Invalid values! </p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events/">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    let filteredEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        );
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageMetaTag}
                <ErrorAlert>
                    <p className="center">No Events found!!!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events/">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <Head>
                <title>Filter Events</title>
                <meta
                    name="description"
                    content={`All events for ${numMonth}/${numYear}.`}
                />
            </Head>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
};

// export const getServerSideProps = async (context) => {
//     const { params } = context;
//     const { slug } = params;
//     const [filterYear, filterMonth] = slug;

//     const numYear = +filterYear;
//     const numMonth = +filterMonth;

//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12
//     ) {
//         return {
//             props: { hasError: true },
//             // notFound: true,
//             // redirect: {
//             //     destination: "/404",
//             // },
//         };
//     }

//     const filterEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth,
//     });

//     return {
//         props: {
//             filterEvents,
//             yearNMonth: {
//                 year: numYear,
//                 month: numMonth,
//             },
//         },
//     };
// };

export default FilterEventsPage;
