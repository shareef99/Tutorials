import {
    connectDatabase,
    insertDocument,
    getAllDocuments,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
    // req.query.[fileName]
    const eventId = req.query.eventId;

    let client;

    try {
        client = await connectDatabase();
    } catch (err) {
        res.status(500).json({
            message: "Connecting to the database failed!",
        });
        return;
    }

    if (req.method === "POST") {
        const { email, name, text } = req.body;

        if (
            !email ||
            !email.includes("@") ||
            !name ||
            name.trim() === "" ||
            !text ||
            !text.trim() === ""
        ) {
            // string.trim() removes the white space from the string
            res.status(422).json({ message: "Invalid Input" });
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId,
        };

        let result;
        try {
            result = await insertDocument(client, "comments", newComment);

            newComment._id = result.insertedId;

            res.status(201).json({
                message: "Added comment.",
                comment: newComment,
            });
        } catch (err) {
            res.status(500).json({ message: "Inserting data failed!" });
            client.close();
            return;
        }
    }

    if (req.method === "GET") {
        try {
            const documents = await getAllDocuments(client, "comments", {
                _id: -1,
            });
            res.status(200).json({ comments: documents });
        } catch (error) {
            res.status(500).json({ message: "Getting comments failed." });
        }
    }

    client.close();
}
