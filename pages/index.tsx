// import { css } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

type Props = {
  userObject: { username: string };
};
export default function Home(props: Props) {
  // TypeScript: using the generic parameter of useState
  // to tell TS about another type in the future
  const [userId, setUserId] = useState<number>();
  function changeUserId(id: number) {
    setUserId(id);
  }
  // Avoid error if userId is undefined
  if (typeof userId === 'number') {
    const multipliedUserId = userId * 2;
    changeUserId(multipliedUserId);
  }

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Home</title>
        <meta name="description" content="Welcome to my website" />
      </Head>
      <div>
        <h1>Home page</h1>
        <p>Home page content</p>
      </div>
    </Layout>
  );
}
