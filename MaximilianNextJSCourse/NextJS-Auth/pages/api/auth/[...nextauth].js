import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers.Credentials({
            // Set Credentials to let next-auth generate forms for you
            // credentials: {},
            async authorize(credentials) {
                const client = await connectToDatabase();

                const userCollections = client.db().collection("users");
                const user = await userCollections.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    client.close();
                    throw new Error("No user found");
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    client.close();
                    throw new Error("Your password is wrong!");
                }

                client.close();
                return { email: user.email };
            },
        }),
    ],
});
