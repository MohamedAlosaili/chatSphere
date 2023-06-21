import { useState, useEffect, FormEvent } from "react";
import { CgSpinner } from "react-icons/cg";

import Input from "@/components/Input";
import Button from "@/components/Button";
import { fetcher } from "@/lib/fetcher";

// Types
import { IndexSignature } from "@/types";

import landing from "@/content/landing.json";

interface Message {
  type: "error" | "success";
  content: string;
}

const Login = () => {
  const [sending, setSending] = useState(false);
  const [value, setValue] = useState<IndexSignature<string>>({ email: "" });
  const [message, setMessage] = useState<Message>();

  useEffect(() => {
    if (message) {
      if (message.type === "error") {
        setMessage(undefined);
      } else {
        setTimeout(() => setMessage(undefined), 3000);
      }
    }
  }, [value.email]);

  const content = landing["en"];

  const getLoginLink = async (e: FormEvent) => {
    e.preventDefault();

    if (!value.email.trim()) {
      return setMessage({ type: "error", content: "Enter an email" });
    }

    setSending(true);
    const res = await fetcher("/api/auth/login", {
      method: "POST",
      data: { email: value.email.trim() },
    });
    setSending(false);

    if (res.success) {
      setMessage({
        type: "success",
        content: "Email has been sent successfully",
      });
      setValue({ email: "" });
    } else {
      setMessage({
        type: "error",
        content:
          res.error ?? "Failed to send an email, please try again in a minute",
      });
    }
  };

  return (
    <div className="bg-accent/10 px-4 py-40">
      <div className="mx-auto flex w-fit flex-col gap-4 rounded-xl bg-accent/10 p-8">
        <h3>{content.login.title}</h3>

        <form
          onSubmit={getLoginLink}
          className="relative flex flex-col gap-6"
          id="login"
        >
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
          {message && (
            <p
              className={`absolute bottom-11 left-2 text-sm ${
                message.type === "error" ? "text-rose-600" : "text-green-600"
              }`}
            >
              {message.content}
            </p>
          )}
          <Button
            disabled={sending || value.email.trim() === ""}
            className="w-full"
          >
            {sending ? (
              <CgSpinner className="animate-[spin_0.5s_linear_infinite;] text-2xl" />
            ) : (
              content.login.submit
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
