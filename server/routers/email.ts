import { z } from "zod";
import { procedure, router } from "../trpc";

import {
  sendEmail,
  createEmailTemplate,
  createHtmlButtonForEmail,
} from "@server/emailHelper";

const _email = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:700px) {

			.desktop_hide table.icons-inner,
			.row-3 .column-1 .block-3.button_block .alignment a,
			.row-3 .column-1 .block-3.button_block .alignment div {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.image_block div.fullWidth {
				max-width: 100% !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-3 .column-1 .block-1.heading_block h1,
			.row-3 .column-1 .block-3.button_block .alignment {
				text-align: left !important;
			}

			.row-3 .column-1 .block-1.heading_block h1 {
				font-size: 20px !important;
			}

			.row-1 .column-1 .block-1.paragraph_block td.pad>div {
				text-align: center !important;
				font-size: 18px !important;
			}

			.row-3 .column-1 .block-4.paragraph_block td.pad>div {
				text-align: justify !important;
				font-size: 10px !important;
			}

			.row-3 .column-1 .block-2.paragraph_block td.pad>div {
				text-align: left !important;
				font-size: 14px !important;
			}

			.row-3 .column-1 .block-3.button_block a,
			.row-3 .column-1 .block-3.button_block div,
			.row-3 .column-1 .block-3.button_block span {
				font-size: 14px !important;
				line-height: 28px !important;
			}

			.row-3 .column-1 {
				padding: 0 24px 48px !important;
			}

			.row-4 .column-1 {
				padding: 32px 16px 48px !important;
			}
		}
	</style>
</head>

<body style="background-color: #f8f6ff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f6ff; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0c071d; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 32px; padding-left: 48px; padding-right: 48px; padding-top: 32px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#ffffff;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:28.799999999999997px;">
																	<p style="margin: 0;">BitScript</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0c071d; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center" style="line-height:10px">
																	<div class="fullWidth" style="max-width: 640px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8171/Email-Illustration.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="An open email illustration" title="An open email illustration"></div>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 48px; padding-left: 48px; padding-right: 48px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-top:12px;text-align:center;width:100%; margin: auto;">
																<h1 style="margin: 0; color: #292929; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 32px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38.4px;"><span class="tinyMce-placeholder">Welcome to BitScript</span></h1>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																<div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
																	<p style="margin: 0; margin-bottom: 16px;">We’re thrilled to have Liquidium on-board & can’t wait to see what you’ll build. This email contains instructions on your subscription plan managed by Pete, please review & confirm the details below:</p>
																	<p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
																	<p style="margin: 0; margin-bottom: 6px;"><strong>1. Beginner Bob ($20/Mo)</strong></p>
																	<p style="margin: 0 0 0 0;"> Please forward this link to Luke (luke@liquidium.fi)</p>
                                  <a
                                     target="_blank"
                                     href='https://www.bitscript.app/?createPassword=true&refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJwZXRlQGxpcXVpZGl1bS5maSIsImlhdCI6MTcwMTgxNDc1N30.GCrJbaucqtPre6bcgQF5M4mx-musI6BlfGliDjaRQrY'
                                     > Account Link
                                  </a>
                                  <p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
                                  <p style="margin: 0; margin-bottom: 6px;"><strong>2. Advanced Alice ($80/Mo)</strong></p>
                                  	<p style="margin: 0 0 0 0;"> Please forward this link to Pete (pete@liquidium.fi )</p>
                        
                                  <a
                                     target="_blank"
                                     href='https://www.bitscript.app/?createPassword=true&refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJwZXRlQGxpcXVpZGl1bS5maSIsImlhdCI6MTcwNDU4NDc4M30.9N2rluLMo3hErQ4oJBGR04Y4opv2-26dF6GTymBMRlk'
                                     > Account Link
                                  </a>
                                  
                                  	<p style="margin: 24px 0 0 0;"> Total ($100/Mo)
</p>
                                  	<p style="margin: 8px 0 0 0;"> Once the payment is made, the team members above can complete their individual setup process with the links provided & can get to building on Bitcoin!
</p>
                                  <p style="margin: 8px 0 0 0;"> We can’t thank you enough for the early support.
</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="button_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding-top:24px;text-align:left;">
																<div class="alignment" align="center"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:48px;width:207px;v-text-anchor:middle;" arcsize="17%" stroke="false" fillcolor="#7259ff">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
<![endif]--><a href="https://buy.stripe.com/9AQ6oT7IogTG9EY6op" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#7259ff;border-radius:8px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:16px;padding-right:16px;font-size:16px;display:inline-block;letter-spacing:normal;"><span style="word-break: break-word; line-height: 32px;">Start Subscription</span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-top:16px;">
																<div style="color:#666666;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
																	<p style="margin: 0;">When confirming, you'll be sent to the BitScript app in order to set & store a password.</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0c071d; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 48px; padding-top: 32px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;">
																<div class="alignment" align="center" style="line-height:10px">
																	<div style="max-width: 150px;"><img src="https://3c31ab3b61070e.imgdist.com/public/users/Integrators/BeeProAgency/1103421_1088874/imported/ade611-20231201-012725/1_BitscriptLogo.png" style="display: block; height: auto; border: 0; width: 100%;" width="150"></div>
																</div>
															</td>
														</tr>
													</table>
													<table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="85%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #9583FF;"><span>&#8202;</span></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-top:16px;">
																<div style="color:#fff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
																	<p style="margin: 0;">You have received this email because you or a team coordinator have subscribed for a paid plan,</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad" style="padding-top:16px;">
																<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
																	<p style="margin: 0;">if you feel you received it by mistake or wish to unsubscribe, <a href="http://example.com/unsubcribe" target="_blank" style="text-decoration: underline; color: #ffffff;" rel="noopener">click here</a>.</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
																<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																	<tr>
																		<td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																			<!--[if !vml]><!-->
																			<table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
																				<tr>
																				
																				
																			</table>
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>

`;
export const sendEmailText = procedure.mutation(async (opts) => {
  try {
    const button = createHtmlButtonForEmail("Testing", "www.bitscript.app");
    const email = createEmailTemplate("Testing", "SubText", button);

    const res = await sendEmail({
      to: ["robin@liquidium.fi", "pete@liquidium.fi", "luke@liquidium.fi"],
      subject: "Lquidium BitScript Onboarding",
      message: "Lquidium BitScript Onboarding",
      html: _email,
    });
    console.log("res", res);
    return "yee";
  } catch (err: any) {
    console.log("err", err);
    throw new Error(err);
  }
});

export const contactTeamEmail = procedure
  .input(
    z.object({
      email: z.string(),
      body: z.string(),
    })
  )
  .output(z.string())
  .mutation(async (opts) => {
    const { email, body } = opts.input;
    try {
      const res = await sendEmail({
        to: ["b@setbern.com", "jnajera1917@gmail.com "],
        subject: `Contact from ${email}`,
        message: body,
        html: body,
      });

      return "success";
    } catch (err: any) {
      throw new Error(err);
    }
  });

/* 
		what will each email have to
		- title 
		- subTitle
		- body?
		- button?
		- footer text?
	*/

export const createEmailButton = (link: string, text: string) => {
  return `
		<div class="alignment" align="center">
			<!--[if mso]>
				<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:48px;width:207px;v-text-anchor:middle;" arcsize="17%" stroke="false" fillcolor="#7259ff">
				<w:anchorlock/>
				<v:textbox inset="0px,0px,0px,0px">
				<center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
			<![endif]-->
			<a 
				href="${link}" 
				target="_blank" 
				style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#7259ff;border-radius:8px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:16px;padding-right:16px;font-size:16px;display:inline-block;letter-spacing:normal;"
			>
				<span style="word-break: break-word; line-height: 32px;">
					${text}
				</span>
				</span>
			</a>
			<!--[if mso]>
				</center>
				</v:textbox>
				</v:roundrect>
			<![endif]-->
		</div>
		`;
};

type EmailButton = {
  link: string;
  text: string;
};

type sendEmailNotificationHelper = {
  emailTo: string[];
  title: string;
  subject: string;
  subtitle: string;
  body?: string;
  button?: EmailButton;
  footerText?: string;
};
export const sendEmailNotificationHelper = async ({
  emailTo,
  title,
  subject,
  subtitle,
  body,
  button,
  footerText,
}: sendEmailNotificationHelper) => {
  try {
    let buttonHTML = undefined;

    if (button) {
      buttonHTML = createEmailButton(button.link, button.text);
    }

    const html = createEmailHTML(title, subtitle, body, buttonHTML, footerText);

    const res = await sendEmail({
      to: emailTo,
      subject: subject,
      message: subject,
      html: html,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

export const createEmailHTML = (
  title: string,
  subTitle: string,
  body?: string,
  button?: string,
  footerText?: string
) => {
  return `
	<!DOCTYPE html>
	<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
	
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
		<style>
			* {
				box-sizing: border-box;
			}
	
			body {
				margin: 0;
				padding: 0;
			}
	
			a[x-apple-data-detectors] {
				color: inherit !important;
				text-decoration: inherit !important;
			}
	
			#MessageViewBody a {
				color: inherit;
				text-decoration: none;
			}
	
			p {
				line-height: inherit
			}
	
			.desktop_hide,
			.desktop_hide table {
				mso-hide: all;
				display: none;
				max-height: 0px;
				overflow: hidden;
			}
	
			.image_block img+div {
				display: none;
			}
	
			@media (max-width:700px) {
	
				.desktop_hide table.icons-inner,
				.row-3 .column-1 .block-3.button_block .alignment a,
				.row-3 .column-1 .block-3.button_block .alignment div {
					display: inline-block !important;
				}
	
				.icons-inner {
					text-align: center;
				}
	
				.icons-inner td {
					margin: 0 auto;
				}
	
				.image_block div.fullWidth {
					max-width: 100% !important;
				}
	
				.mobile_hide {
					display: none;
				}
	
				.row-content {
					width: 100% !important;
				}
	
				.stack .column {
					width: 100%;
					display: block;
				}
	
				.mobile_hide {
					min-height: 0;
					max-height: 0;
					max-width: 0;
					overflow: hidden;
					font-size: 0px;
				}
	
				.desktop_hide,
				.desktop_hide table {
					display: table !important;
					max-height: none !important;
				}
	
				.row-3 .column-1 .block-1.heading_block h1,
				.row-3 .column-1 .block-3.button_block .alignment {
					text-align: center !important;
				}
	
				.row-3 .column-1 .block-1.heading_block h1 {
					font-size: 20px !important;
				}
	
				.row-1 .column-1 .block-1.paragraph_block td.pad>div {
					text-align: center !important;
					font-size: 18px !important;
				}
	
				.row-3 .column-1 .block-4.paragraph_block td.pad>div {
					text-align: justify !important;
					font-size: 10px !important;
				}
	
				.row-3 .column-1 .block-2.paragraph_block td.pad>div {
					text-align: center !important;
					font-size: 14px !important;
				}
	
				.row-3 .column-1 .block-3.button_block a,
				.row-3 .column-1 .block-3.button_block div,
				.row-3 .column-1 .block-3.button_block span {
					font-size: 14px !important;
					line-height: 28px !important;
				}
	
				.row-3 .column-1 {
					padding: 0 24px 48px !important;
				}
	
				.row-4 .column-1 {
					padding: 32px 16px 48px !important;
				}
			}
		</style>
	</head>
	
	<body style="background-color: #f8f6ff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
		<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f6ff; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;">
			<tbody>
				<tr>
					<td>
						<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0c071d; color: #000000; width: 680px; margin: 0 auto;" width="680">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 32px; padding-left: 48px; padding-right: 48px; padding-top: 32px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="paragraph_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
															<tr>
																<td class="pad">
																	<div style="color:#ffffff;direction:ltr;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:24px;font-weight:700;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:28.799999999999997px;">
																		<p style="margin: 0;">BitScript</p>
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0c071d; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
																	<div class="alignment" align="center" style="line-height:10px">
																		<div class="fullWidth" style="max-width: 640px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/8171/Email-Illustration.png" style="display: block; height: auto; border: 0; width: 100%;" width="640" alt="An open email illustration" title="An open email illustration"></div>
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 48px; padding-left: 48px; padding-right: 48px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="padding-top:12px;text-align:center;width:100%; margin: auto;">
																	<h1 style="margin: 0; color: #292929; direction: ltr; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 32px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 38.4px;"><span class="tinyMce-placeholder">${title}</span></h1>
																</td>
															</tr>
														</table>
														<table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
															<tr>
																<td class="pad" style="padding-bottom:10px;padding-top:10px;">
																	<div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:19.2px;">
																		<p style="margin: 0; margin-bottom: 16px;">${subTitle}</p>
																		<p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
																		 ${body || '<p style="margin: 0;">&nbsp;</p>'}
																		
																	</div>
																</td>
															</tr>
														</table>
														<table class="button_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="padding-top:24px;text-align:center;">
																	${button}
																</td>
															</tr>
														</table>
														<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
															<tr>
																<td class="pad" style="padding-top:16px;">
																	<div style="color:#666666;direction:center;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
																	
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0c071d; border-radius: 0; color: #000000; width: 680px; margin: 0 auto;" width="680">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 48px; padding-top: 32px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="width:100%;">
																	<div class="alignment" align="center" style="line-height:10px">
																		<div style="max-width: 150px;"><img src="https://3c31ab3b61070e.imgdist.com/public/users/Integrators/BeeProAgency/1103421_1088874/imported/ade611-20231201-012725/1_BitscriptLogo.png" style="display: block; height: auto; border: 0; width: 100%;" width="150"></div>
																	</div>
																</td>
															</tr>
														</table>
														<table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad">
																	<div class="alignment" align="center">
																		<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="85%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																			<tr>
																				<td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #9583FF;"><span>&#8202;</span></td>
																			</tr>
																		</table>
																	</div>
																</td>
															</tr>
														</table>
														<table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
															<tr>
																<td class="pad" style="padding-top:16px;">
																	<div style="color:#fff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
																	 
																		<p style="margin: 0;">  ${footerText || "Thank you for using BitScript"}</p>
																	</div>
																</td>
															</tr>
														</table>
														<table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
															<tr>
																<td class="pad" style="padding-top:16px;">
																	<div style="color:#ffffff;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
																		
																	</div>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
						<table class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
							<tbody>
								<tr>
									<td>
										<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px; margin: 0 auto;" width="680">
											<tbody>
												<tr>
													<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
														<table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
															<tr>
																<td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
																	<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
																		<tr>
																			<td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
																				<!--[if !vml]><!-->
																				<table class="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
																					<tr>
																					
																					
																				</table>
																			</td>
																		</tr>
																	</table>
																</td>
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table><!-- End -->
	</body>
	
	</html>
	`;
};
