const UserProfilePage = ({ username }) => {
    return <h1>{username}</h1>;
};

export async function getServerSideProps(context) {
    const { params, req, res } = context;

    return {
        props: {
            username: "Shareef",
        },
    };
}

export default UserProfilePage;
