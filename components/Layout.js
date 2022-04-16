import Head from 'next/head';
import Header from './Header';

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header userObject={props.userObject} />

      <main>{props.children}</main>
    </>
  );
}
