import { NextApiRequest, NextApiResponse } from "next";

import asyncHandler from "server/middlewares/asyncHandler";
import ErrorResponse from "server/utils/errorResponse";
import error from "server/middlewares/errorHandler";

// @desc    Login user
// @route   POST /api/auth/login
// access   Public
export const login = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      return error(new ErrorResponse("Invalid request method", 400), req, res);
    }

    const { email } = req.body;

    const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!validEmail.test(email)) {
      return error(new ErrorResponse("Invalid email", 400), req, res);
    }

    res.status(200).json({ success: true, email });
  }
);
