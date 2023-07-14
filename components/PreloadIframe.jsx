import Head from "next/head";

const PreloadIframe = ({ src }) => (
  <Head>
    <link rel="preload" href={src} as="iframe" />
  </Head>
);

export default PreloadIframe;
