import { NextApiRequest, NextApiResponse } from "next";

import errorHandler from "./errorHandler";

type Req = NextApiRequest;
type Res = NextApiResponse;
type Fn = (req: Req, res: Res) => void;

const asyncHandler = (fn: Fn) => (req: Req, res: Res) =>
  Promise.resolve(fn(req, res)).catch(err => errorHandler(err, req, res));

export default asyncHandler;
