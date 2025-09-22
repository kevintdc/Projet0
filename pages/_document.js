import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>
        Toudic Development | Création de sites web & design freelance
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Solutions web et design freelance" />
      <meta name="author" content="Toudic Development" />
      <meta
        name="keywords"
        content="web, design, freelance, développement, création, site internet, graphisme, aude, limoux, 
        développeur web, carcassonne, aude, meilleur, compétent, qualité, prix, limoux et alentours"
      />
      <meta
        property="og:title"
        content="Toudic Development | Création de sites web & design freelance"
      />
      <meta
        property="og:description"
        content="Solutions web et design freelance"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://toudicdev.fr" />
      <meta property="og:image" content="/og-image.png" />
      <link rel="canonical" href="https://toudicdev.fr" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
