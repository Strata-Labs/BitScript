let aws = require("@aws-sdk/client-ses");

import nodemailer from "nodemailer";
import { fromEnv } from "@aws-sdk/credential-providers";
const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-2",
  credentials: fromEnv(),
  //accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  //secretAccessKey: process.env.AWS_SECRET_KEY,
});

let transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

interface sendEmail {
  to: string[];
  subject: string;
  message: string;
  html: string;
}

export const sendEmail = async (params: sendEmail) => {
  try {
    const sentEmail = await transporter.sendMail({
      from: "noreply@bitscript.app",
      to: params.to,
      subject: params.subject,
      text: params.message,
      html: params.html,
    });
    return sentEmail;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const createHtmlButtonForEmail = (title: string, url: string) => {
  return `
    <div class="alignment" align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com" style="height:54px;width:223px;v-text-anchor:middle;" arcsize="0%" strokeweight="0.75pt" strokecolor="#8412c0" fillcolor="#8412c0"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:14px"><![endif]--><a href="${url}"target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#F79328;border-radius:0px;width:auto;border-top:1px solid transparent;font-weight:400;border-right:1px solid transparent;border-bottom:1px solid transparent;border-left:1px solid transparent;padding-top:10px;padding-bottom:10px;font-family:'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:40px;padding-right:40px;font-size:14px;display:inline-block;letter-spacing:normal;"><span style="word-break:break-word;"><span style="line-height: 28px;" data-mce-style>${title}</span></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div>
    `;
};

export const createEmailTemplate = (
  title: string,
  subText: string,
  buttonHtml: string
) => {
  const htmlString = `
  <!DOCTYPE html>
  <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"><!--<![endif]-->
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
  
      @media (max-width:670px) {
  
        .desktop_hide table.icons-inner,
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }
  
        .icons-inner {
          text-align: center;
        }
  
        .icons-inner td {
          margin: 0 auto;
        }
  
        .image_block img.fullWidth {
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
      }
    </style>
  </head>
  
  <body style="background-color: #000; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #000;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FBCA95;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 650px; margin: 0 auto;" width="650">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-bottom:15px;padding-top:15px;width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px">
                                    <svg
                    style='width: 200px;'
                    viewBox="0 0 131 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.4485 37.0857C19.6301 37.0857 19.8116 37.0178 19.9504 36.879L21.3779 35.4515C21.654 35.1769 21.654 34.7267 21.3779 34.4506L19.9504 33.0231C19.8131 32.8843 19.6315 32.8164 19.4514 32.8164C19.2699 32.8164 19.0883 32.8858 18.951 33.0231L17.5234 34.4506C17.2474 34.7267 17.2474 35.1769 17.5234 35.4515L18.951 36.879C19.0898 37.0163 19.2699 37.0857 19.4514 37.0857H19.4485Z"
                      fill="white"
                    />
                    <path
                      d="M27.2887 12.5369C27.4673 12.7141 27.7006 12.8026 27.9323 12.8026C28.1656 12.8026 28.3988 12.7141 28.576 12.5369L30.411 10.7019C30.7638 10.3476 30.7652 9.77043 30.411 9.41613L28.576 7.58115C28.3988 7.404 28.167 7.31543 27.9338 7.31543C27.7006 7.31543 27.4688 7.404 27.2902 7.58115L25.4552 9.41613C25.1009 9.77043 25.1009 10.3476 25.4552 10.7019L27.2902 12.5369H27.2887Z"
                      fill="white"
                    />
                    <path
                      d="M18.9481 4.06263C19.0868 4.19992 19.2669 4.26931 19.4485 4.26931C19.6301 4.26931 19.8116 4.2014 19.9504 4.06263L21.3779 2.6351C21.654 2.36052 21.654 1.91026 21.3779 1.63421L19.9504 0.206675C19.8131 0.0693836 19.6315 0 19.4514 0C19.2713 0 19.0883 0.0693836 18.951 0.206675L17.5234 1.63421C17.2474 1.91026 17.2474 2.36052 17.5234 2.6351L18.951 4.06263H18.9481Z"
                      fill="white"zz
                    />
                    <path
                      d="M36.3578 16.6172C36.0817 16.3411 35.6315 16.3411 35.3569 16.6172L33.9294 18.0447C33.7906 18.1835 33.7227 18.3636 33.7227 18.5452C33.7227 18.7268 33.7906 18.9083 33.9294 19.0471L35.3569 20.4746C35.6329 20.7492 36.0817 20.7507 36.3578 20.4746L37.7853 19.0471C37.9241 18.9098 37.992 18.7282 37.992 18.5467C37.992 18.3651 37.9241 18.185 37.7853 18.0462L36.3578 16.6187V16.6172Z"
                      fill="white"
                    />
                    <path
                      d="M11.6067 29.5076L13.4417 27.6727C13.796 27.3198 13.796 26.7412 13.4417 26.3869L11.6067 24.5519C11.4296 24.3747 11.1978 24.2847 10.9631 24.2862C10.7313 24.2862 10.4981 24.3747 10.3209 24.5519L8.48447 26.3869C8.13018 26.7412 8.13018 27.3198 8.48447 27.6727L10.3194 29.5076C10.4981 29.6848 10.7313 29.7719 10.9631 29.7734C11.1963 29.7734 11.4296 29.6848 11.6067 29.5076Z"
                      fill="white"
                    />
                    <path
                      d="M3.53941 20.4712L4.96693 19.0437C5.1057 18.9064 5.17363 18.7248 5.17363 18.5432C5.17363 18.3616 5.10422 18.1815 4.96693 18.0428L3.53941 16.6152C3.26335 16.3392 2.8131 16.3392 2.53851 16.6152L1.11099 18.0428C0.972226 18.1815 0.904297 18.3616 0.904297 18.5432C0.904297 18.7248 0.972226 18.9064 1.11099 19.0451L2.53851 20.4727C2.81457 20.7473 3.26335 20.7487 3.53941 20.4727V20.4712Z"
                      fill="white"
                    />
                    <path
                      d="M8.48347 19.1874L10.3184 21.0224C10.4971 21.1995 10.7303 21.2881 10.9636 21.2881C11.1968 21.2881 11.43 21.1995 11.6072 21.0224L13.3699 19.2597H17.0428L18.733 20.9501V24.623L16.9704 26.3856C16.6161 26.7399 16.6161 27.3171 16.9704 27.6714L18.8054 29.5064C19.1597 29.8607 19.7369 29.8607 20.0912 29.5064L21.8539 27.7437H25.5267L27.2894 29.5064C27.6437 29.8607 28.2224 29.8607 28.5767 29.5064L30.4117 27.6714C30.766 27.3171 30.766 26.7399 30.4117 26.3856L28.649 24.623V20.9515L30.4131 19.1874C30.766 18.8331 30.7674 18.2559 30.4131 17.9016L28.5782 16.0651C28.401 15.888 28.1692 15.7994 27.936 15.8009C27.7027 15.8009 27.471 15.888 27.2923 16.0651L25.4574 17.9016C25.1031 18.2559 25.1031 18.8331 25.4574 19.1874L27.22 20.9501V24.6215L25.5297 26.3133H21.8568L20.1665 24.6215V20.9486L21.9291 19.1874C22.2849 18.8331 22.2849 18.2544 21.9291 17.9001L20.0942 16.0651C19.7399 15.7108 19.1626 15.7108 18.8069 16.0651L17.0442 17.8278H13.3713L11.6087 16.0651L11.6825 16.1375V12.4646L13.3713 10.7743H17.0442L18.8069 12.5369C18.9855 12.7141 19.2188 12.8026 19.4505 12.8026C19.6823 12.8026 19.917 12.7141 20.0942 12.5369L21.9291 10.7019C22.2834 10.3476 22.2834 9.77043 21.9291 9.41613L20.0942 7.58115C19.917 7.404 19.6852 7.31543 19.452 7.31543C19.2188 7.31543 18.9855 7.404 18.8083 7.58115L17.0457 9.34527H13.3728L11.6087 7.58115C11.2544 7.22685 10.6772 7.22685 10.3214 7.58115L8.48643 9.41613C8.13213 9.77043 8.1336 10.3476 8.48643 10.7019L10.2491 12.4646V16.1375L10.3229 16.0651L8.48643 17.9016C8.13213 18.2559 8.13213 18.8331 8.48643 19.1874H8.48347Z"
                      fill="#F79327"
                    />
                    <path
                      d="M53.4308 25.543V11.8105H58.9238C59.9029 11.8105 60.6944 12.0076 61.2984 12.4018C61.9023 12.7896 62.3442 13.2791 62.6239 13.8704C62.9037 14.4616 63.0435 15.0592 63.0435 15.6632C63.0435 16.4325 62.8687 17.0714 62.519 17.58C62.1757 18.0887 61.7021 18.4288 61.0981 18.6004V18.1236C61.9564 18.3016 62.5985 18.699 63.0245 19.3157C63.4568 19.9324 63.6729 20.6222 63.6729 21.3851C63.6729 22.2052 63.5204 22.9268 63.2152 23.5499C62.9164 24.1729 62.4586 24.6624 61.8419 25.0185C61.2253 25.3681 60.4496 25.543 59.5151 25.543H53.4308ZM56.0629 23.1016H59.248C59.5977 23.1016 59.9092 23.0285 60.1826 22.8823C60.456 22.7297 60.669 22.5199 60.8215 22.2529C60.9805 21.9795 61.06 21.6585 61.06 21.2897C61.06 20.9655 60.9932 20.6762 60.8597 20.4219C60.7262 20.1676 60.5227 19.9673 60.2494 19.8211C59.9823 19.6685 59.6486 19.5922 59.248 19.5922H56.0629V23.1016ZM56.0629 17.17H58.8856C59.1781 17.17 59.4388 17.1191 59.6676 17.0174C59.8965 16.9157 60.0777 16.7599 60.2112 16.5501C60.3447 16.3339 60.4115 16.0574 60.4115 15.7204C60.4115 15.3008 60.2811 14.948 60.0205 14.6619C59.7598 14.3758 59.3815 14.2328 58.8856 14.2328H56.0629V17.17ZM65.7656 13.8131V11.5244H68.3595V13.8131H65.7656ZM65.7656 25.543V15.2436H68.3595V25.543H65.7656ZM77.3981 25.543C76.6861 25.6765 75.9867 25.7337 75.3001 25.7146C74.6198 25.7019 74.0095 25.5843 73.4691 25.3618C72.9351 25.1329 72.5282 24.7673 72.2484 24.2651C71.9941 23.7946 71.8606 23.3178 71.8479 22.8346C71.8352 22.3451 71.8288 21.792 71.8288 21.1753V12.3827H74.4227V21.0227C74.4227 21.4232 74.4259 21.7856 74.4323 22.1099C74.445 22.4277 74.5117 22.682 74.6325 22.8728C74.8614 23.2352 75.227 23.4322 75.7292 23.464C76.2315 23.4958 76.7878 23.4704 77.3981 23.3877V25.543ZM70.0741 17.2463V15.2436H77.3981V17.2463H70.0741ZM84.3566 25.8291C83.4157 25.8291 82.5669 25.6733 81.8104 25.3618C81.0602 25.0503 80.4371 24.6084 79.9412 24.0362C79.4517 23.464 79.1243 22.7838 78.959 21.9954L80.0843 21.8047C80.3195 22.7202 80.8217 23.4418 81.591 23.9695C82.3666 24.4971 83.298 24.761 84.3852 24.761C85.1227 24.761 85.7743 24.6434 86.3402 24.4081C86.906 24.1729 87.3478 23.8423 87.6657 23.4163C87.9836 22.984 88.1425 22.4818 88.1425 21.9096C88.1425 21.4963 88.0663 21.1498 87.9137 20.8701C87.7674 20.5904 87.5767 20.3615 87.3415 20.1835C87.1063 19.9991 86.8551 19.8529 86.5881 19.7448C86.3211 19.6304 86.07 19.5382 85.8347 19.4683L82.3825 18.4383C81.9248 18.3048 81.5147 18.1395 81.1523 17.9424C80.7963 17.739 80.4943 17.5069 80.2464 17.2463C80.0048 16.9792 79.8172 16.6773 79.6837 16.3403C79.5566 16.0034 79.493 15.6283 79.493 15.215C79.493 14.4775 79.6901 13.8322 80.0843 13.2791C80.4784 12.726 81.0188 12.2969 81.7055 11.9917C82.3984 11.6802 83.1931 11.5244 84.0896 11.5244C84.9923 11.5308 85.8029 11.6992 86.5214 12.0298C87.2398 12.3541 87.8278 12.815 88.2856 13.4126C88.7497 14.0102 89.0485 14.7191 89.182 15.5392L88.0472 15.7395C87.9582 15.1101 87.7293 14.5602 87.3606 14.0897C86.9982 13.6192 86.5341 13.2537 85.9682 12.993C85.4024 12.7324 84.773 12.602 84.08 12.602C83.4125 12.5957 82.8212 12.7069 82.3062 12.9358C81.7976 13.1647 81.3971 13.473 81.1047 13.8608C80.8122 14.2486 80.666 14.6873 80.666 15.1769C80.666 15.6855 80.8027 16.0924 81.076 16.3975C81.3558 16.6963 81.6959 16.9316 82.0964 17.1032C82.5033 17.2749 82.8911 17.4147 83.2599 17.5228L86.0255 18.343C86.2861 18.4192 86.5976 18.5273 86.96 18.6672C87.3224 18.8071 87.6784 19.0073 88.0281 19.268C88.3778 19.5223 88.6671 19.8624 88.8959 20.2884C89.1312 20.708 89.2488 21.2357 89.2488 21.8714C89.2488 22.4881 89.1312 23.0412 88.8959 23.5308C88.6607 24.0203 88.3237 24.4367 87.8851 24.7801C87.4464 25.117 86.9282 25.3745 86.3306 25.5525C85.733 25.7369 85.075 25.8291 84.3566 25.8291ZM95.391 25.8291C94.3611 25.8291 93.4932 25.6002 92.7875 25.1424C92.0818 24.6783 91.5446 24.0394 91.1759 23.2256C90.8135 22.4055 90.6259 21.4614 90.6132 20.3933C90.6259 19.3061 90.8167 18.3557 91.1854 17.5419C91.5605 16.7218 92.1009 16.086 92.8066 15.6346C93.5123 15.1832 94.3769 14.9575 95.4005 14.9575C96.3987 14.9575 97.276 15.1991 98.0326 15.6823C98.7955 16.1591 99.3232 16.8171 99.6156 17.6563L98.5475 18.0473C98.2869 17.4052 97.8768 16.9093 97.3173 16.5596C96.7579 16.2036 96.1158 16.0256 95.391 16.0256C94.5772 16.0256 93.9065 16.2132 93.3788 16.5883C92.8511 16.957 92.4569 17.4688 92.1963 18.1236C91.9356 18.7785 91.7989 19.535 91.7862 20.3933C91.8053 21.7093 92.1136 22.7679 92.7112 23.5689C93.3152 24.3636 94.2085 24.761 95.391 24.761C96.1221 24.761 96.7547 24.5925 97.2887 24.2555C97.8291 23.9186 98.2424 23.4291 98.5285 22.7869L99.6156 23.1589C99.2151 24.0299 98.6556 24.6942 97.9372 25.152C97.2188 25.6034 96.3701 25.8291 95.391 25.8291ZM101.616 25.543V15.2436H102.617V17.7136L102.369 17.3893C102.484 17.0969 102.627 16.8267 102.798 16.5787C102.976 16.3244 103.158 16.1178 103.342 15.9588C103.615 15.7045 103.936 15.5138 104.305 15.3867C104.674 15.2532 105.046 15.1769 105.421 15.1578C105.796 15.1324 106.136 15.161 106.441 15.2436V16.2831C106.034 16.1877 105.602 16.1686 105.144 16.2259C104.687 16.2831 104.257 16.4802 103.857 16.8171C103.507 17.1223 103.253 17.4783 103.094 17.8852C102.935 18.2857 102.833 18.7085 102.789 19.1536C102.744 19.5922 102.722 20.0214 102.722 20.441V25.543H101.616ZM108.437 13.1647V11.7628H109.534V13.1647H108.437ZM108.437 25.543V15.2436H109.534V25.543H108.437ZM116.911 25.8291C115.983 25.8291 115.198 25.5875 114.556 25.1043C113.913 24.6211 113.424 23.9695 113.087 23.1493C112.75 22.3292 112.581 21.4042 112.581 20.3742C112.581 19.3379 112.75 18.4129 113.087 17.5991C113.424 16.779 113.923 16.1337 114.584 15.6632C115.245 15.1928 116.056 14.9575 117.016 14.9575C117.95 14.9575 118.748 15.1959 119.41 15.6728C120.071 16.1496 120.573 16.7981 120.916 17.6182C121.266 18.4383 121.441 19.357 121.441 20.3742C121.441 21.4042 121.263 22.3324 120.907 23.1589C120.557 23.979 120.045 24.6306 119.371 25.1138C118.704 25.5907 117.884 25.8291 116.911 25.8291ZM112.4 30.1205V15.2436H113.402V23.1779H113.497V30.1205H112.4ZM116.844 24.7801C117.601 24.7801 118.23 24.5861 118.732 24.1983C119.241 23.8105 119.623 23.286 119.877 22.6248C120.137 21.9573 120.268 21.2071 120.268 20.3742C120.268 19.5477 120.141 18.8071 119.886 18.1522C119.638 17.491 119.26 16.9697 118.752 16.5883C118.249 16.2004 117.607 16.0065 116.825 16.0065C116.069 16.0065 115.436 16.1941 114.927 16.5692C114.419 16.9379 114.037 17.4529 113.783 18.1141C113.529 18.7753 113.402 19.5287 113.402 20.3742C113.402 21.2134 113.526 21.9668 113.774 22.6344C114.028 23.2955 114.409 23.8201 114.918 24.2079C115.433 24.5893 116.075 24.7801 116.844 24.7801ZM129.003 25.543C128.456 25.6638 127.916 25.7083 127.382 25.6765C126.848 25.651 126.371 25.5334 125.951 25.3236C125.538 25.1075 125.226 24.7769 125.017 24.3318C124.845 23.9695 124.75 23.6039 124.731 23.2352C124.712 22.8664 124.702 22.4436 124.702 21.9668V12.3827H125.808V21.9477C125.808 22.38 125.811 22.7393 125.818 23.0253C125.83 23.3051 125.897 23.5626 126.018 23.7978C126.247 24.2365 126.609 24.5035 127.105 24.5989C127.601 24.6879 128.234 24.672 129.003 24.5512V25.543ZM122.394 16.2449V15.2436H129.003V16.2449H122.394Z"
                      fill="white"
                    />
                  </svg>
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
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FBCA95;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff;  background-position: center top; background-repeat: no-repeat; color: #000; width: 650px; margin: 0 auto;" width="650">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            
                            
                            <table class="heading_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="padding-top:35px;text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: black; direction: ltr; font-family: 'Cabin', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 28px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><strong>${title}</strong></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-left:45px;padding-right:45px;padding-top:10px;">
                                  <div style="color:#393d47;font-family:'Cabin',Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:18px;line-height:150%;text-align:center;mso-line-height-alt:27px;">
                                    <p style="margin: 0; word-break: break-word;"><span style="color:black;">${subText}</span></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-5" width="100%" border="0" cellpadding="20" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="80%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #E1B4FC;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:10px;padding-left:45px;padding-right:45px;padding-top:10px;">
                                  <div style="color:#393d47;font-family:'Cabin',Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:13px;line-height:150%;text-align:left;mso-line-height-alt:19.5px;">
                                    <p style="margin: 0; word-break: break-word;"><span style="color:#8412c0;"></span></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="button_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  ${buttonHtml}
                                 
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad" style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                  <div style="color:#393d47;font-family:'Cabin',Arial,'Helvetica Neue',Helvetica,sans-serif;font-size:10px;line-height:120%;text-align:center;mso-line-height-alt:12px;">
                                    <p style="margin: 0; word-break: break-word;"><span style="color:black;"><span>If you didn't request to change your brand password, </span><span>you don't have to do anything. So that's easy.</span></span></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-9" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
  <!-- 														<tr>
                                <td class="pad" style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                  <div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                    <p style="margin: 0; word-break: break-word;"><span style="color:#8a3b8f;">yourlogo © ·</span><span> </span><span><a href="http://[unsubscribe]/" target="_blank" rel="noopener" style="color: #8412c0;">Unsuscribe</a></span></p>
                                  </div>
                                </td>
                              </tr> -->
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FBCA95;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 650px; margin: 0 auto;" width="650">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="divider_block block-1" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;"><span>&#8202;</span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
  <!-- 																<div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:11px;line-height:120%;text-align:center;mso-line-height-alt:13.2px;">
                                    <p style="margin: 0; word-break: break-word;"><span style="color:#8a3b8f;">Duis euismod neque at lacus rutrum, nec suscipit eros tincidunt nterdum et malesuada.</span></p>
                                    <p style="margin: 0; word-break: break-word;"><span style="color:#8a3b8f;">Fames ac ante ipsum vestibulum.</span></p>
                                  </div> -->
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
  <!-- 																<div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:11px;line-height:120%;text-align:center;mso-line-height-alt:13.2px;">
                                    <p style="margin: 0; word-break: break-word;"><span><span style="color:#8a3b8f;">Your Street 12, 34567 AB City&nbsp; /&nbsp;&nbsp;info@example.com /&nbsp;(+1) 123 456 789</span><a href="http://www.example.com" style="color: #8412c0;"></a></span></p>
                                  </div> -->
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#8412c0;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
                                    <p style="margin: 0; word-break: break-word;">&nbsp;</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="social_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table class="social-table" width="72px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                      <tr>
                                      
                                        <td style="padding:0 2px 0 2px;"><a href="https://www.twitter.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-color/twitter@2x.png" width="32" height="32" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
                                      </tr>
                                    </table>
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
            <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #fff; width: 650px; margin: 0 auto;" width="650">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <tr>
                                      <td class="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                        <!--[if !vml]><!-->
                                        
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

  return htmlString;
};
