import { google } from "googleapis";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(200).json({
            message: "Invalid Method!",
            filepath: path.join(process.cwd(), "public/images/demo.png"),
        });
        return;
    }

    const CLIENT_ID =
        "813485292827-ogvun2bj4sui7uckfjt1onluoq1c9le2.apps.googleusercontent.com";
    const CLIENT_SECRET = "9WWu9uWlZITMCgYNk0g1nTIS";
    const REDIRECT_URL = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN =
        "1//048whntt5dWP6CgYIARAAGAQSNwF-L9IrmlEZS29X29mNxfB4D9D8OUx7vovfY3tkib4K8aJRQOsN3p3-3xcO9S4_zXEF9FIjbPY";

    const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URL
    );

    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    // const filepath: string = req.body.image;
    const filepath = path.join(process.cwd(), "public/images/demo.jpg");

    const drive = google.drive({
        version: "v3",
        auth: oauth2Client,
    });

    try {
        const result = await drive.files.create({
            requestBody: {
                name: "ShareefBlog.jpg",
                mimeType: "image/jpg",
            },
            media: {
                mimeType: "image/jpg",
                body: fs.createReadStream(filepath),
            },
        });

        console.log(result);
        res.status(200).json({ message: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
};

export default handler;
