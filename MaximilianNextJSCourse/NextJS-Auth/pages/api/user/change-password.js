import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default async function handler(req, res) {
    if (req.method === "PATCH") {
        const session = await getSession({ req: req });

        if (!session) {
            // 401 means auth is missing
            res.status(401).json({ message: "Not Auth!" });
            return;
        }

        const userEmail = session.user.email;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({ email: userEmail });

        if (!user) {
            res.status(404).json({ message: "User Not Found!" });
            client.close();
            return;
        }

        const currentPassword = user.password;
        const passwordsAreEqual = await verifyPassword(
            oldPassword,
            currentPassword
        );

        if (!passwordsAreEqual) {
            // 403 means you are authenticated but not authorized
            // Simple means you are login but entered invalid value for password
            res.status(403).json({ message: "Invalid Password" });
            client.close();
            return;
        }

        const hashedPassword = await hashPassword(newPassword);

        // First argument for finding the doc and second argument for updating
        const result = await usersCollection.updateOne(
            { email: userEmail },
            { $set: { password: hashedPassword } }
        );

        client.close();
        res.status(200).json({ message: "Password updated" });
    }
}
