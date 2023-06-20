import { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

import { getTokenCookie } from "@/lib/authCookies";
import { API_URL } from "@/config";

const target = API_URL;
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    const token = getTokenCookie(req);

    // don't forwards the cookies to the target server
    req.headers.cookie = "";

    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }

    proxy.once("error", reject);

    proxy.web(req, res);
  });
};

export default handler;

/* Handling The request Manually without a proxy

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  const token = getTokenCookie(req);

  const options: AxiosRequestConfig = {
    method,
    headers: { Authorization: `Bearer ${token}` },
  };

  if (method === "POST" || method === "PUT") {
    options.data = req.body;
  }

  try {
    const response = await axios(`${target}${req.url}`, options);

    res.status(response.status).json(response.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      res.status(err.response?.status ?? 500).json(err.response?.data);
    } else {
      res.status(500).json({
        success: false,
        data: null,
        error: "Internal Server Error",
      });
    }
  }
};

*/
