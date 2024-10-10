import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface NewArticleEmailProps {
  articleTitle: string;
  articleSubtitle: string;
  articleLink: string;
  articleDescription: string;
  articleImage: string;
  articleLogoImage: string;
  recipientEmail: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const NewArticleEmailTemplate = ({
  articleTitle,
  articleSubtitle,
  articleLink,
  articleDescription,
  articleImage,
  articleLogoImage,
  recipientEmail,
}: NewArticleEmailProps) => {
  const previewText = `New Article: ${articleTitle}`;

  const unsubscribeLink = `${baseUrl}/unsubscribe/${recipientEmail}`;

  return (
    <Html>
      <Head />
      <style></style>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-4 font-sans">
          <Container className=" mx-auto my-[40px] max-w-[600px]">
            <Section className="mb-[35px]">
              <Container className="mt-[20px] w-full bg-gray-900 text-white ">
                <Section className="px-[16px]">
                  <Column className="w-[24px]">
                    <img
                      src={articleLogoImage}
                      width="50"
                      height="50"
                      alt="Bitscript Logo"
                    />
                  </Column>
                  <Column>
                    <Heading
                      as="h2"
                      className="w-[90%] py-[10px] pl-[26px] text-center text-2xl font-bold"
                    >
                      New Lesson
                    </Heading>
                  </Column>
                  <Column className=" align-right w-[24px]">
                    <Img
                      src={articleLogoImage}
                      className=""
                      width="50"
                      height="50"
                      alt="Bitscript Logo"
                    />
                  </Column>
                </Section>
              </Container>
              {/* <Img
                alt="Herman Miller Chair"
                className="mt-[20px] w-full rounded-[12px] object-cover"
                height="320"
                src={articleImage}
              /> */}
              <Section className="mt-[32px] text-center">
                <Heading
                  as="h1"
                  className="m-0 mt-[8px]  text-[36px] font-bold leading-[36px] text-gray-900"
                >
                  {articleTitle}
                </Heading>
                <Text className="my-[12px] text-lg leading-[28px] text-gray-500">
                  {articleSubtitle}
                </Text>
                <Text className="text-[16px] leading-[24px] text-gray-500">
                  {articleDescription}
                </Text>
                <Button
                  className="mt-[16px] w-3/4 rounded-3xl border-2 border-solid border-black bg-[#F79327]  px-[40px] py-[12px] font-semibold text-black"
                  href={articleLink}
                >
                  Read {articleTitle}
                </Button>
              </Section>

              <Section
                style={{
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  borderTop: "1px solid #e0e0e0",
                  marginTop: "32px",
                }}
              >
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#666666",
                    textAlign: "center",
                    margin: "0 0 10px 0",
                  }}
                >
                  This email was sent to {recipientEmail}. If you no longer wish
                  to receive these emails, you can{" "}
                  <Link
                    href={unsubscribeLink}
                    style={{
                      color: "#666666",
                      textDecoration: "underline",
                    }}
                  >
                    unsubscribe here
                  </Link>
                  .
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    color: "#666666",
                    textAlign: "center",
                    margin: "0",
                  }}
                >
                  &copy; {new Date().getFullYear()} BitScript. All rights
                  reserved.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

// NewArticleEmailTemplate.PreviewProps = {
//   articleTitle: "🔑 From Keys to Wallets in Bitcoin",
//   articleSubtitle: "Foundation and History of Bitcoin Key Pairs",
//   articleLink: "https://react.email",
//   articleImage:
//     "https://www.bitscript.app/articles/Generating%20A%20Taproot%20Pubkey%202/TaprootSteps.png",
//   articleDescription:
//     "Today, we’ll discuss one of the most common—yet often misunderstood—concepts in Bitcoin: the term 'wallets.' We will also clarify the deluge of terminology, including legacy, SegWit, P2PK, P2WPKH, and more. To read the rest of this lesson, please follow the link below to log into your BitScript account",
//   articleLogoImage: "https://www.bitscript.app/images/BitscriptLogo.png",
//   recipientEmail: "test@test.com",
// } as NewArticleEmailProps;

export default NewArticleEmailTemplate;
