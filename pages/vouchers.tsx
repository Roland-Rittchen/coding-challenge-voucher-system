import { css } from '@emotion/react';
import { ExportToCsv } from 'export-to-csv';
// import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createVoucherCode } from '../util/database';

const options = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  showTitle: true,
  title: 'My Awesome CSV',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: true,
};

const csvExporter = new ExportToCsv(options);

const errorStyles = css`
  color: red;
`;

type Props = {
  userObject: { username: string };
};

export default function Login(props: Props) {
  const [numberToBuy, setNumberToBuy] = useState(1);
  const [errorText, setErrorText] = useState('');

  async function buy() {
    const codes: string[] = [];
    for (let i = 0; i < numberToBuy; i++) {
      const tmpCode = await createVoucherCode();
      if (tmpCode) {
        codes.push();
      } else {
        setErrorText('Something went wrong, try again');
        break;
      }
    }
    csvExporter.generateCsv(codes);
    setNumberToBuy(1);
  }

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Vouchers</title>
        <meta name="description" content="Buy vouchers for the shop" />
      </Head>

      <h1>Vouchers</h1>

      <span>price: </span>
      <span>20 €</span>
      <br />
      <input
        id="numberToBuy"
        data-test-id="product-quantity"
        type="number"
        min="1"
        value={numberToBuy}
        onChange={(e) => {
          setNumberToBuy(parseInt(e.target.value));
        }}
      />
      <button onClick={buy} data-test-id="buy">
        Buy Voucher Codes
      </button>
      <div css={errorStyles}>{errorText}</div>
    </Layout>
  );
}

export async function getServerSideProps() {}
