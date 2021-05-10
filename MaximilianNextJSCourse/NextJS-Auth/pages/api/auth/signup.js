import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const { email, password } = data;

        if (
            !email ||
            !email.includes("@") ||
            !password ||
            password.trim().length < 7
        ) {
            res.status(422).json({
                message:
                    "Invalid Input - password should be al least 7 characters long.",
            });
            return;
        }
        const client = await connectToDatabase();

        const db = client.db();

        // {email // property to search: email // value to look for}
        const existingUser = db.collection("users").findOne({ email: email });
        if (existingUser) {
            res.status(422).json({ message: "User Already exists!" });
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(password);

        const result = await db.collection("users").insertOne({
            email: email,
            password: hashedPassword,
        });

        res.status(200).json({ message: "Created user!" });
    }
}
