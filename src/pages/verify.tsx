import Link from "next/link";

import { propsWithMessage, redirect } from "@/utils/serverProps";
import { getTokenCookie, setTokenCookie } from "@/lib/authCookies";
import { signJwtToken, verifyJwtToken } from "@/lib/jwtToken";
import Button from "@/components/Button";

// Types
import { GetServerSidePropsContext } from "next";

const Verify = () => {
  return (
    <div className="h-screen bg-accent/5 p-4 pt-16 text-white">
      <div className="mx-auto flex max-w-md flex-col gap-4 rounded-xl bg-accent/10 px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Failed to authenticate</h1>
        <p>Either the link is invalid or it is expired</p>
        <Link href="/landing#login">
          <Button>Request A new Link</Button>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  res,
  req,
  query,
}: GetServerSidePropsContext) => {
  // if the user manually navigate to this page it will redirect to home page if there is a token in the cookies
  if (getTokenCookie(req)) return redirect("/");

  // users comes from magic link will have token in the url query
  const token = query.token as string;
  if (!token) return redirect("/landing");

  try {
    const decoded = verifyJwtToken<{ id: string }>(token);
    // create new token after verfing the user
    const newToken = signJwtToken({ id: decoded.id }, { expiresIn: "30d" });

    setTokenCookie(res, newToken);

    return redirect("/");
  } catch (err) {
    console.log(err);
    return propsWithMessage(
      "Failed to authenticate, try to request a new login link"
    );
  }
};

export default Verify;
