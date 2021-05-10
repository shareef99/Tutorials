import { MongoClient } from "mongodb";

export async function connectToDatabase() {
    const client = await MongoClient.connect(
        "mongodb+srv://shareef:shareef58S@cluster0.kvvdg.mongodb.net/next-auth?retryWrites=true&w=majority"
    );

    return client;
}
