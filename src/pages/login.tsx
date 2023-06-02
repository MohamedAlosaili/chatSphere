import React, { FormEvent, useRef } from "react";
import Head from "next/head";
import Image from "next/image";

import { server } from "@/config";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const sendLoginLink = async (e: FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;

    if (!email) {
      return console.log("Email is empty");
    }

    const res = await fetch(`${server}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const emailSent = await res.json();

    console.log(emailSent);

    if (emailSent.success) {
      console.log("Email sent successfully", emailSent);
    }
  };

  return (
    <>
      <Head>
        <title>Login | ChatSphere 💬</title>
      </Head>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col gap-4 bg-slate-200 p-4 rounded-2xl">
          <form className="flex flex-col" onSubmit={sendLoginLink}>
            <label>
              Email:
              <input
                ref={emailRef}
                type="email"
                placeholder="example@gmail.com"
                className="border border-slate-950"
              />
            </label>
            <button className="border border-slate-900 py-2 px-4">Send</button>
          </form>
          <div>Or</div>
          <button className="flex items-center gap-2 border border-slate-900 py-2 px-4">
            Login with Google{" "}
            <Image
              src="/images/google-logo.png"
              alt="Google logo"
              height={25}
              width={25}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
