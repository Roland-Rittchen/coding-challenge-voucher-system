import { css } from '@emotion/react';
import { ExportToCsv } from 'export-to-csv';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { VoucherResponseBody } from './api/buyVouchers';

const options = {
  filename: 'VoucherCodes',
  fieldSeparator: ';',
  showLabels: false,
  showTitle: true,
  title: 'Voucher Codes',
  useTextFile: false,
  useBom: true,
  useKeysAsHeaders: false,
};

const csvExporter = new ExportToCsv(options);

const errorStyles = css`
  color: red;
`;
const voucherStyles = css`
  margin: 10;
`;

type Code = { code: string };
type Props = {
  userObject: { username: string };
};

type Errors = { message: string }[];

export default function Login(props: Props) {
  const [numberToBuy, setNumberToBuy] = useState(1);
  const [errors, setErrors] = useState<Errors>([]);
  const [codes, setCodes] = useState<string[]>([]);

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
      <button
        onClick={async (event) => {
          event.preventDefault();
          const voucherResponse = await fetch('/api/buyVouchers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              numberToBuy: numberToBuy,
            }),
          });

          const voucherResponseBody =
            (await voucherResponse.json()) as VoucherResponseBody;

          if ('errors' in voucherResponseBody) {
            setErrors(voucherResponseBody.errors);
            return;
          }
          setErrors([]); // clear the errors - maybe not necessary with redirect
          setCodes(voucherResponseBody.codes);
          // reformat the Array to an array of objects to satisfy the CSV export
          const csvCodes: Code[] = [];
          for (const c of voucherResponseBody.codes) {
            csvCodes.push({
              code: c,
            });
          }
          // csv export file will be downloaded by the user
          csvExporter.generateCsv(csvCodes);

          // reset value in the field
          setNumberToBuy(1);
        }}
        data-test-id="buy"
      >
        Buy Voucher Codes
      </button>
      <div css={errorStyles}>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
      <br />
      <div css={voucherStyles}>
        {codes.map((code, index) => {
          return (
            <div key={`code-${code}`} data-test-id={`code-${index}`}>
              {code}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
