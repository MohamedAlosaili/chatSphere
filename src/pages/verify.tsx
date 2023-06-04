import Link from "next/link";
import { GetServerSidePropsContext } from "next";

import { propsWithMessage, redirect } from "@/utils/serverProps";
import { setTokenCookie } from "@lib/authCookies";
import { signJwtToken, verifyJwtToken } from "@lib/jwtToken";

const Verify = ({ message }: { message: string }) => {
  return (
    <div>
      <h2>{message}</h2>
      {/* Inform message if the authentication failed */}
      <Link href="/">Home</Link>
    </div>
  );
};

export const getServerSideProps = async ({
  res,
  req,
  query,
}: GetServerSidePropsContext) => {
  // if the user manually navigate to this page it will redirect to home page if there is a token in the cookies
  if (req.cookies.token) return redirect("/home");

  // users comes from magic link will have token in the url query
  const token = query.token as string;
  if (!token) return redirect("/");

  try {
    const decoded = verifyJwtToken<{ id: string }>(token);
    // create new token after verfing the user
    const newToken = signJwtToken({ id: decoded.id }, { expiresIn: "30d" });

    setTokenCookie(res, newToken);

    return redirect("home");
  } catch (err) {
    console.log(err);
    return propsWithMessage(
      "Failed to authenticate, try to request a new login link"
    );
  }
};

export default Verify;
