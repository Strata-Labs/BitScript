import { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "@server/emailHelper";
import prisma from "@server/db";
import { z } from "zod";
import NewArticleEmailTemplate from "../emailTemplates";
import { render } from "@react-email/render";

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
    // articleImageUrl,
    articleDescription,
    articleSubtitle,
    // articleLogoImage,
    recipientEmail,
  } = req.body;

  const articleNotificationSchema = z.object({
    articleTitle: z.string(),
    articleUrl: z.string(),
    // articleImageUrl: z.string(),
    articleDescription: z.string(),
    articleSubtitle: z.string(),
    // articleLogoImage: z.string(),
    recipientEmail: z.string(),
  });

  const { success } = articleNotificationSchema.safeParse({
    articleTitle,
    articleUrl,
    // articleImageUrl,
    articleDescription,
    articleSubtitle,
    // articleLogoImage,
    recipientEmail,
  });

  if (!success) {
    return res.status(400).json({ message: "Invalid request" });
  }

  const html = await render(
    NewArticleEmailTemplate({
      articleTitle: articleTitle,
      articleLink: articleUrl,
      articleDescription: articleDescription,
      // articleImage: articleImageUrl,
      articleSubtitle: articleSubtitle,
      // articleLogoImage: articleLogoImage,
      recipientEmail: recipientEmail, 
    }),
    {
      pretty: true,
    }
  );

  console.log("this is the html: ", html)


  try {
    // Grab all users from the database
    // const users = await prisma.user.findMany({
    //   select: {
    //     email: true,
    //   },
    // });
    // console.log("this are the users: ", users)

    // await sendEmail({
    //   to: users.map((user) => user.email),
    //   subject: `New Article: ${articleTitle}`,
    //   message: `A new article has been posted: ${articleTitle}. Read it here: ${articleUrl}`,
    //   html: `<p>A new article has been posted: <strong>${articleTitle}</strong>.</p><p>Read it here: <a href="${articleUrl}">${articleUrl}</a></p>`,
    // });

    await sendEmail({
      to: recipientEmail,
      subject: `New Bitscript Article: ${articleTitle}`,
      message: `A new article has been posted: ${articleTitle}. Read it here: ${articleUrl}`,
      html: html,
    });
    res.status(200).json({ message: "Notifications sent successfully" });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Error sending notifications" });
  }
}
