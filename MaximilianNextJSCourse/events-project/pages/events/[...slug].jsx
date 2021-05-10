import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

const FilterEventsPage = () => {
    const router = useRouter();

    const filterData = router.query.slug;

    if (!filterData) {
        return (
            <Fragment>
                <p className="center">Loading...</p>
                <div className="center">
                    <Button link="/events/">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const [filterYear, filterMonth] = filterData;

    const numYear = +filterYear;
    const numMonth = +filterMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p className="center"> Invalid values! </p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/events/">Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filterEvents = getFilteredEvents({
        year: numYear,
        month: numMonth,
    });

    if (!filterEvents || filterEvents.length === 0) {
        return (
            <Fragment>
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
            <ResultsTitle date={date} />
            <EventList items={filterEvents} />
        </Fragment>
    );
};

export default FilterEventsPage;
