import React from "react";
import Head from "next/head";


export default function SEO({
  description = "Credenc Academy",
  author = "Credenc",
  meta,
  title = "Credenc Academy",
  keywords = "Credenc",
  language = "en",
}) {

    const metaData = [
    {
      name: `title`,
      property: `og:title`,
      content: title,
    },
    {
      name: `description`,
      property: `og:description`,
      content: description,
    },
    {
      name: `keywords`,
      property: `og:keywords`,
      content: keywords,
    },
    {
      name: `website`,
      property: `og:type`,
      content: `website`,
    },
    {
      name: "language",
      content: language,
    },
  ].concat(meta);

  return (
    <Head>
      <title>{title}</title>
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400&display=swap"
          rel="stylesheet"
      />
      {metaData.map(({ name, content }, i) => (
        <meta key={i} name={name} content={content} />
      ))}
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};