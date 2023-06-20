import { FormEvent, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { getTokenCookie } from "@/lib/authCookies";
import { redirect } from "@/utils/serverProps";
import { fetcher } from "@/lib/fetcher";

// Types
import { GetServerSidePropsContext } from "next";
import { IndexSignature } from "@/types";

const Landing = () => {
  const [sending, setSending] = useState(false);
  const [value, setValue] = useState<IndexSignature<string>>({ email: "" });

  const getLoginLink = async (e: FormEvent) => {
    e.preventDefault();

    if (!value.email.trim()) {
      return;
    }

    setSending(true);
    const res = await fetcher("/api/auth/login", {
      method: "POST",
      data: { email: value.email.trim() },
    });
    setSending(false);

    if (!res.success) {
      return toast.error("Failed to send an email, please try again later.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <ToastContainer limit={2} />
      <form onSubmit={getLoginLink} className="flex gap-4">
        <Input
          name="email"
          disabled={sending}
          type="email"
          placeholder="example@gmail.com"
          required
          value={value.email}
          setValue={setValue}
          className="text-tcolor"
        />
        <Button disabled={sending} className="w-40">
          {sending ? (
            <CgSpinner className="animate-[spin_0.5s_linear_infinite;] text-2xl" />
          ) : (
            "Get login link"
          )}
        </Button>
      </form>
    </div>
  );
};

export const getServerSideProps = ({ req }: GetServerSidePropsContext) => {
  const token = getTokenCookie(req);

  if (token) return redirect("/");

  return {
    props: {},
  };
};

export default Landing;
