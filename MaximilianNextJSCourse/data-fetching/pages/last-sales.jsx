import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false);

    const { data, error } = useSWR(
        "https://nextjs-dummy-backend-d1fe2-default-rtdb.firebaseio.com/sales.json"
    );

    useEffect(() => {
        if (data) {
            const transformSales = [];
            for (const key in data) {
                transformSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformSales);
        }
    }, [data]);

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch(
    //         "https://nextjs-dummy-backend-d1fe2-default-rtdb.firebaseio.com/sales.json"
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const transformSales = [];
    //             for (const key in data) {
    //                 transformSales.push({
    //                     id: key,
    //                     username: data[key].username,
    //                     volume: data[key].volume,
    //                 });
    //             }

    //             setSales(transformSales);
    //             setIsLoading(false);
    //         });
    // }, []);

    if (error) {
        return <h1>Failed to load</h1>;
    }

    if (!data && !sales) {
        return <h1>Loading...</h1>;
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    );
};

export async function getStaticProps() {
    const res = await fetch(
        "https://nextjs-dummy-backend-d1fe2-default-rtdb.firebaseio.com/sales.json"
    );
    const data = res.json();
    const transformSales = [];
    for (const key in data) {
        transformSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }

    return {
        props: {
            sales: transformSales,
        },
        revalidate: 10,
    };
}

export default LastSalesPage;
