import Head from "next/head";
import { SITE_TITLE } from "@/config/index";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>Bionicos &amp; Juices Rios - {title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {children}
    </div>
  );
}

Layout.defaultProps = {
  title: SITE_TITLE,
  description: "100% Natural juices, smoothies and fruit salads.",
  keywords: "bionicos palmdale, juice bar palmdale, healthy food palmdale",
};
