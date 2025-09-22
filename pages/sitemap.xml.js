// pages/sitemap.xml.js

export async function getServerSideProps({ res }) {
  const baseUrl = "https://toudicdev.fr";

  const pages = ["", "#services", "#portfolio", "#contact"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}/${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${page === "" ? "1.0" : "0.8"}</priority>
      </url>
    `
      )
      .join("")}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
