import Head from "next/head";
import { useRouter } from "next/router";

interface Meta {
  title: string;
  description?: string;
}

interface Props {
  meta: Meta;
}

const CustomHead: React.FC<Props> = ({ meta }) => {
  const { title: name, description } = meta;
  const router = useRouter();
  const title = `${name} - Bitscript`;
  console.log("router", router.asPath);
  return (
    <Head>
      <title>{title}</title>
      {/* This is the default though but it's good practice to explitly set it  */}
      <meta name="robots" content="follow, index" />
      <meta content={description} name="description" />
      <meta
        property="og:url"
        content={`https://www.bitscript.app${router.asPath}`}
      />
      <link
        rel="canonical"
        href={`https://www.bitscript.app${router.asPath}`}
      />
      <meta property="og:site_name" content="Bitscript" />
      <meta
        property="og:image"
        content="https://www.bitscript.app/images/linkImg.png"
      />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://www.bitscript.app/images/linkImg.png"
      />
    </Head>
  );
};

export default CustomHead;
