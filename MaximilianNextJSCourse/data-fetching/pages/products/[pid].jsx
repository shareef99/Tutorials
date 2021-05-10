import path from "path";
import fs from "fs";

const ProductId = ({ loadedProduct }) => {
    if (!loadedProduct) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </div>
    );
};

async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);

    return data;
}

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map((product) => product.id);

    const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

    return {
        paths: pathWithParams,
        fallback: false,
        // fallback: false
        // If paths is fine and pre-render
        // fallback: true
        // If paths is generating on demand then you have to add fallback case in JSX
        // if (!loadedProduct) {
        //    return <p>Loading...</p>;
        // }
        // fallback: 'blocking'
        // No need for fallback case , nextJS will wait and then response
    };
}

export async function getStaticProps(context) {
    const { params } = context;
    const productId = params.pid;

    const data = await getData();

    const loadedProduct = data.products.find((x) => x.id === productId);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            loadedProduct,
        },
    };
}

export default ProductId;
