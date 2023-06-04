//  packages
import Link from "next/link";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";

// server modules
import { getTokenCookie } from "@lib/authCookies";

// client modules & components
import Login from "@/components/Login";
import { redirect } from "@/utils/serverProps";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl">Landing Page</h1>
      <Link href="/home">Home page</Link>
      <button onClick={() => setShowLogin(true)}>Login</button>
      {showLogin && (
        <>
          <button
            className="fixed top-8 left-8 text-4xl z-10"
            onClick={() => setShowLogin(false)}
          >
            X
          </button>
          <Login />
        </>
      )}
    </div>
  );
};

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  const token = getTokenCookie(req);

  if (token) return redirect("/home");

  return {
    props: {},
  };
};

export default Landing;
