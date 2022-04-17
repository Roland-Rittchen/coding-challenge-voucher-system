import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '../components/Layout';
import hoodie from '../public/Hoodie.jpg';
import { VoucherResponseBody } from './api/redeemVouchers';

const errorStyles = css`
  color: red;
`;

type Props = {
  userObject: { username: string };
};
type Errors = { message: string }[];

export default function Home(props: Props) {
  // TypeScript: using the generic parameter of useState
  // to tell TS about another type in the future
  const [userId, setUserId] = useState<number>();
  const [voucherCode, setVoucherCode] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
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
        <br />
        <Image src={hoodie} alt="Picture of Merchandise Hoodie" />
        <p>Buy this Hoodie with a Voucher Code</p>
        <br />
        <input
          id="voucherCode"
          data-test-id="voucher-code"
          value={voucherCode}
          onChange={(e) => {
            setVoucherCode(e.target.value);
          }}
        />
        <button
          onClick={async (event) => {
            event.preventDefault();
            const voucherResponse = await fetch('/api/redeemVouchers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code: voucherCode,
              }),
            });

            const voucherResponseBody =
              (await voucherResponse.json()) as VoucherResponseBody;

            if ('errors' in voucherResponseBody) {
              setErrors(voucherResponseBody.errors);
              return;
            }
            setErrors([]); // clear the errors - maybe not necessary with redirect

            window.alert('Hoodie successfully bought!');

            // reset value in the field
            setVoucherCode('');
          }}
          data-test-id="buy"
        >
          Redeem Voucher
        </button>
        <div css={errorStyles}>
          {errors.map((error) => {
            return <div key={`error-${error.message}`}>{error.message}</div>;
          })}
        </div>
      </div>
    </Layout>
  );
}
