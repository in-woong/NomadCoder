import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface ISeoProps {
  title?: string | null;
}

export default function Seo({ title }: ISeoProps) {
  const data = useStaticQuery<Queries.SeoQueryQuery>(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          description
          siteUrl
          title
        }
      }
    }
  `);

  return (
    <title>
      {title} | {data.site?.siteMetadata?.title}{" "}
    </title>
  );
}
