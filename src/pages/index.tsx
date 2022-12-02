import * as React from "react";
import Layout from "@/components/layout/Layout";
import Seo from "@/components/Seo";
import { trpc } from "@/utils/trpc";
import Head from "next/head";

export default function HomePage() {
  const hello = trpc.hello.useQuery({ text: "client" });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  const data = trpc.test.useQuery({ hello: "welcome" });
  React.useEffect(() => {
    console.log(data.data?.data);
  }, [data]);

  return (
 
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <main>
        <p>{data.isLoading ? "Loading" : data.data?.msg}</p>
        <p>{hello.data.greeting}</p>
      </main>
    </Layout>
  );
}
