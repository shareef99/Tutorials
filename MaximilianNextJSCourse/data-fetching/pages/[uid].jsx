const UserIdPage = ({ id }) => {
    return <h1>{id}</h1>;
};

export async function getServerSideProps(context) {
    const { params } = context;

    const userId = params.uid;

    return {
        props: {
            id: "userid-" + userId,
        },
    };
}

export default UserIdPage;
