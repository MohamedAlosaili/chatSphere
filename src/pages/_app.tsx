import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>ChatSphere 💬</title>
        {/* TODO: Add meta tags for improving SEO - alt: next-seo */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
