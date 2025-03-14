import { NextApiRequest, NextApiResponse } from "next";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phoneNumber, message } = req.body;

    const command = new PublishCommand({
      Message: message,
      PhoneNumber: phoneNumber,
    });

    await snsClient.send(command);

    return res.status(200).json({ message: "SMS sent successfully!" });
  } catch (error) {
    console.error("Error sending SMS:", error);
    return res.status(500).json({ message: "Failed to send SMS" });
  }
}
