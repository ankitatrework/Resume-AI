import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Header from "~/components/Header";
import ChatPage from "~/components/ChatPage";

export default function chat() {

    return (
        <>
          <Head>
            <title>Create T3 App</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Toaster />
          <ChatPage />
        </>
      );
}

