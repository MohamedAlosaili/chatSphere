import { redirect } from "@/utils/serverProps";
import { removeTokenCookie } from "@/lib/authCookies";

//  Types
import { ServerResponse } from "http";

const Logout = () => false;

export const getServerSideProps = ({ res }: { res: ServerResponse }) => {
  try {
    removeTokenCookie(res);
    return redirect("/landing");
  } catch (err) {
    return redirect("/");
  }
};

export default Logout;
