import { propsWithMessage, redirect } from "@/utils/serverProps";
import { getTokenCookie, setTokenCookie } from "@/lib/authCookies";
import { signJwtToken, verifyJwtToken } from "@/lib/jwtToken";

// Types
import { GetServerSidePropsContext } from "next";

const Verify = ({ message }: { message: string }) => {
  return (
    <div>
      <h2>{message}</h2>
      {/* Inform message if the authentication failed */}
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
