import { RPC_METHODS } from "@/const/RPC";
import { OP_CODES } from "@/utils/OPS";
import { SCRIPTS_LIST } from "@/utils/SCRIPTS";
import { BitcoinBasics } from "@/utils/TUTORIALS";
import { getBaseUrl } from "@server/trpc";
import { GetServerSidePropsContext } from "next";

function generateSiteMap(baseUrl: string) {
  const BASE_URL = baseUrl;
  const lastMod = new Date("2022-03-21T18:00:00-05:00").toISOString();
  const SINGLE_ROUTE = [
    {
      url: `${BASE_URL}/`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/example`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/formatter`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/article`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/hashCalculator`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/hashedkey`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/home`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/lessons`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/OPS`,
      lastModified: lastMod,
    },

    {
      url: `${BASE_URL}/publickey`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/rpc`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/sandbox`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/scripts`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: lastMod,
    },
    {
      url: `${BASE_URL}/transactions`,
      lastModified: lastMod,
    },
  ];

  const OP_CODES_SITE_MAP = OP_CODES.map((op) => {
    return {
      url: `${BASE_URL}${encodeURI(op.linkPath)}`,
      lastModified: lastMod,
    };
  });
  const SCRIPTS_SITE_MAP = SCRIPTS_LIST.map((script) => {
    return {
      url: `${BASE_URL}${encodeURI(script.linkPath)}`,
      lastModified: lastMod,
    };
  });

  const LESSONS_SITE_MAP = BitcoinBasics.map((lesson) => {
    return {
      url: `${BASE_URL}${encodeURI(lesson.href)}`,
      lastModified: lastMod,
    };
  });

  const rpcs = RPC_METHODS.map((rpc) => {
    return {
      url: `${BASE_URL}${encodeURI(rpc.linkPath)}`,
      lastModified: lastMod,
    };
  });
  const SITE_MAP_DATA = [
    ...SINGLE_ROUTE,
    ...OP_CODES_SITE_MAP,
    ...SCRIPTS_SITE_MAP,
    ...LESSONS_SITE_MAP,
    ...rpcs,
  ];

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
     ${SITE_MAP_DATA.map(
       (url) => `
         <url>
           <loc>${url.url}</loc>
           <lastmod>${url.lastModified}</lastmod>
         </url>
       `
     ).join("")}
   </urlset>
 `;

  return sitemap;
}
function SiteMap() {
  // getServerSideProps is basically returning back xml so no need returning anything here
}

export async function getServerSideProps({
  res,
}: GetServerSidePropsContext): Promise<{ props: {} }> {
  //get the base url
  const baseUrl = getBaseUrl();

  // generate the sitemap with the baseurl
  const sitemap = generateSiteMap(baseUrl);

  console.log("this is siteMap: ", sitemap);

  res.setHeader("Content-Type", "text/xml");
  // tells vercel to cache this
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");
  // send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
