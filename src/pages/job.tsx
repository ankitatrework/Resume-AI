import Head from "next/head";
import { Toaster } from "react-hot-toast";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import JobList from "~/components/JobList";

export default function Job() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Toaster />
      <JobList />
      <Footer />
    </>
  );
}
