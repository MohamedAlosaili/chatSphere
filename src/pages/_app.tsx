import Head from "next/head";
import type { AppProps } from "next/app";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ChatSphere 💬</title>
        <meta
          name="description"
          content="ChatSphere is a real-time web chat application that allows users to connect, chat, and communicate in real-time. Join the conversation and connect with people from around the world."
        />
        <meta
          name="keywords"
          content="chat application, web chat, real-time chat, chat platform, messaging app, online communication, chat with friends, connect with people"
        />
        <meta
          property="og:title"
          content="ChatSphere - Real-Time Web Chat Application"
        />
        <meta
          property="og:description"
          content="ChatSphere is a real-time web chat application that allows users to connect, chat, and communicate in real-time. Join the conversation and connect with people from around the world."
        />
        {/* TODO: Add image */}
        <meta property="og:image" content="" />
        <meta
          name="twitter:title"
          content="ChatSphere - Real-Time Web Chat Application"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:description"
          content="ChatSphere is a real-time web chat application that allows users to connect, chat, and communicate in real-time. Join the conversation and connect with people from around the world."
        />
        {/* TODO: Add image */}
        <meta property="twitter:image" content="" />
      </Head>
      <Component {...pageProps} />
      <div id="modal"></div>
    </>
  );
}
