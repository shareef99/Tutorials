import { connectDatabase, insertDocument } from "../../helpers/db-util";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        if (!userEmail || !userEmail.includes("@")) {
            // 422 status code means user input was bad
            res.status(422).json({ message: "Invalid email address." });
            return;
        }

        let client;

        try {
            client = await connectDatabase();
        } catch (err) {
            res.status(500).json({
                message: "Connecting to the database failed!",
            });
            return;
        }

        try {
            await insertDocument(client, "newsletter", { email: userEmail });
            client.close();
        } catch (err) {
            res.status(500).json({
                message: "Inserting data failed!",
            });
            return;
        }

        console.log(userEmail);
        // 201 status code means 'SUCCESS'
        res.status(201).json({ message: "sign up!", email: userEmail });
    }
}
