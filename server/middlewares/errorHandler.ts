import { NextApiRequest, NextApiResponse } from "next";

import { ErrResponse } from "server/utils/errorResponse";

const errorHandler = (
  err: ErrResponse | Error,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const status = "statusCode" in err ? err.statusCode : 500;

  res.status(status).json({
    success: false,
    data: null,
    error: err.message,
  });
};

export default errorHandler;
