import Landing from "@/features/Landing";
import { getTokenCookie } from "@/lib/authCookies";
import { redirect } from "@/utils/serverProps";

// Types
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  const token = getTokenCookie(req);

  if (token) return redirect("/");

  return {
    props: {},
  };
};

export default Landing;
