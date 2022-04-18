import { NextApiRequest, NextApiResponse } from 'next';
import randomWords from 'random-words';
import { createVoucherCode } from '../../util/database';

type VoucherRequestBody = {
  numberToBuy: number;
};

type VoucherNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: VoucherRequestBody;
};

export type VoucherResponseBody =
  | { errors: { message: string }[] }
  | { codes: string[] };

export default async function voucherHandler(
  request: VoucherNextApiRequest,
  response: NextApiResponse<VoucherResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.numberToBuy !== 'number' ||
      !request.body.numberToBuy ||
      request.body.numberToBuy < 1
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Invalid number to buy',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    const codes: string[] = [];
    for (let i = 0; i < request.body.numberToBuy; i++) {
      const [initcode] = randomWords({
        exactly: 1,
        wordsPerString: 3,
        separator: '-',
      });
      const tmpCode = await createVoucherCode(initcode);
      codes.push(tmpCode.code);
    }

    if (codes.length < request.body.numberToBuy) {
      response.status(401).json({
        errors: [
          {
            message: 'Something went wrong, please try again',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    response.status(201).json({
      codes: codes,
    });
    return;
  }

  response.status(405).json({
    errors: [
      {
        message: 'Method not supported, try POST instead',
      },
    ],
  });
}
