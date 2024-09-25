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
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const NewArticleEmailTemplate = ({
  articleTitle,
  articleSubtitle,
  articleLink,
  articleDescription,
  articleImage,
}: NewArticleEmailProps) => {
  const previewText = `New Article: ${articleTitle}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-4 font-sans">
          <Container className=" mx-auto my-[40px] max-w-[600px]">
            <Section className="mb-[35px]">
              <Container className="w-full bg-black text-center  text-white">
                <Section className="px-[16px]">
                  <Column>
                    <Img
                      src="/static/BitScriptMinLogo.svg"
                      width="50"
                      height="50"
                      alt=""
                    />
                  </Column>
                  <Column>
                    <Heading as="h2" className="text-[36px] font-bold">
                      New Lesson
                    </Heading>
                  </Column>
                  <Column>
                    <Img
                      src="/static/BitScriptMinLogo.svg"
                      width="50"
                      height="50"
                      alt=""
                    />
                  </Column>
                </Section>
              </Container>
              <Img
                alt="Herman Miller Chair"
                className="w-full rounded-[12px] object-cover"
                height="320"
                src={articleImage}
              />
              <Section className="mt-[32px] text-center">
                <Heading
                  as="h1"
                  className="m-0 mt-[8px] text-[36px] font-bold leading-[36px] text-gray-900"
                >
                  {articleTitle}
                </Heading>
                <Text className="my-[16px] text-xl leading-[28px] text-gray-600">
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
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

NewArticleEmailTemplate.PreviewProps = {
  articleTitle: "Generating A Taproot PubKey (Pt. 1) ",
  articleSubtitle: "Overview & Example Setup",
  articleLink: "https://react.email",
  articleImage:
    "https://www.bitscript.app/articles/Generating%20A%20Taproot%20Pubkey%202/TaprootSteps.png",
  articleDescription:
    "In this article, we'll explore the process of generating a taproot pubkey, starting with an overview and a simple example setup using the taproot script.",
} as NewArticleEmailProps;

export default NewArticleEmailTemplate;