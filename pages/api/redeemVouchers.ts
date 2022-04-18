import { NextApiRequest, NextApiResponse } from 'next';
import { checkVoucherCode, Code, deleteVoucherCode } from '../../util/database';

type RedeemVoucherRequestBody = {
  code: string;
};

type VoucherNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: RedeemVoucherRequestBody;
};

export type VoucherResponseBody =
  | { errors: { message: string }[] }
  | { code: Code };

export default async function voucherHandler(
  request: VoucherNextApiRequest,
  response: NextApiResponse<VoucherResponseBody>,
) {
  if (request.method === 'POST') {
    if (typeof request.body.code !== 'string' || !request.body.code) {
      response.status(400).json({
        errors: [
          {
            message: 'No Code provided',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // check if it is an existing voucher code
    const checkVoucher = await checkVoucherCode(request.body.code);
    if (!checkVoucher) {
      response.status(401).json({
        errors: [
          {
            message: 'Invalid voucher code',
          },
        ],
      });
      return; // Important: will prevent "Headers already sent" error
    }

    // code exists, so redeem and delete it
    const delVoucher = await deleteVoucherCode(checkVoucher.id);
    response.status(201).json({
      code: delVoucher,
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
