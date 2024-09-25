import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@server/emailHelper";
import prisma from "@server/db";
import { z } from "zod";
import NewArticleEmailTemplate from "../emailTemplates";
import { render } from "@react-email/render";

// Rate limiting
const RATE_LIMIT = 1; // 1 request per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

const rateLimitStore: { [key: string]: number } = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const {
    articleTitle,
    articleUrl,
    articleImageUrl,
    articleDescription,
    articleSubtitle,
  } = req.body;

  const articleNotificationSchema = z.object({
    articleTitle: z.string(),
    articleUrl: z.string(),
    articleImageUrl: z.string(),
    articleDescription: z.string(),
    articleSubtitle: z.string(),
  });

  const { success } = articleNotificationSchema.safeParse({
    articleTitle,
    articleUrl,
    articleImageUrl,
    articleDescription,
    articleSubtitle,
  });

  if (!success) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const html = await render(
    NewArticleEmailTemplate({
      articleTitle: articleTitle,
      articleLink: articleUrl,
      articleDescription: articleDescription,
      articleImage: articleImageUrl,
      articleSubtitle: articleSubtitle,
    }),
    {
      pretty: true,
    }
  );

  console.log("this is the html: ", html)

  //   const session = await getSession({ req });
  //   if (!session || !session.user) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }

  //   // Rate limiting
  //   const userId = session.user.id;
  //   const now = Date.now();
  //   const userLastRequest = rateLimitStore[userId] || 0;

  //   if (now - userLastRequest < RATE_LIMIT_WINDOW) {
  //     return res.status(429).json({ message: "Too many requests" });
  //   }

  //   rateLimitStore[userId] = now;

  try {
    // Grab all users from the database
    // const users = await prisma.user.findMany({
    //   select: {
    //     email: true,
    //   },
    // });

    // await sendEmail({
    //   to: users.map((user) => user.email),
    //   subject: `New Article: ${articleTitle}`,
    //   message: `A new article has been posted: ${articleTitle}. Read it here: ${articleUrl}`,
    //   html: `<p>A new article has been posted: <strong>${articleTitle}</strong>.</p><p>Read it here: <a href="${articleUrl}">${articleUrl}</a></p>`,
    // });

    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Error sending notifications" });
  }
}
