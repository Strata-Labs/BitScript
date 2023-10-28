import { procedure, router } from "../trpc";

import {
  sendEmail,
  createEmailTemplate,
  createHtmlButtonForEmail,
} from "@server/emailHelper";

export const sendEmailText = procedure.mutation(async (opts) => {
  try {
    const button = createHtmlButtonForEmail("Testing", "www.bitscript.app");
    const email = createEmailTemplate("Testing", "SubText", button);

    const res = await sendEmail({
      to: "b@setbern.com",
      subject: "Testing",
      message: "Testing",
      html: email,
    });
    console.log("res", res);
  } catch (err: any) {
    console.log("err", err);
    throw new Error(err);
  }
});
