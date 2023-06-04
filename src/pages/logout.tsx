//  packages
import { ServerResponse } from "http";

// server modules
import { redirect } from "@/utils/serverProps";
import { removeTokenCookie } from "@lib/authCookies";

const Logout = () => {
  return false;
};

export const getServerSideProps = ({ res }: { res: ServerResponse }) => {
  try {
    removeTokenCookie(res);
    return redirect("/");
  } catch (err) {
    return redirect("/home");
  }
};

export default Logout;
