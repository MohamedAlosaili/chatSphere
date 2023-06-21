import Button from "@/components/Button";
import Header from "./Header";
import Login from "./Login";
import Scrollable from "@/components/Scrollable";
import Link from "next/link";
import Video from "@/components/Video";
import Card from "./Card";

import landing from "@/content/landing.json";

const Landing = () => {
  const content = landing["en"];
  return (
    <div className="h-screen text-tcolor">
      <Scrollable className="scroll-smooth ">
        <Header />
        <section className="bg-accent/10 py-12">
          <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl flex-wrap-reverse items-center justify-between gap-8 px-4">
            <div className="mx-auto w-[35rem] gap-4 font-medium">
              <h1 className="text-4xl font-semibold sm:text-6xl">
                {content.main.title}
              </h1>
              <h2 className="mb-4 mt-8 max-w-lg leading-normal sm:text-xl">
                {content.main.desciption}
              </h2>
              <p className="mb-4 text-sm sm:text-base">
                {content.main.addition}
              </p>
              <Link href="#login">
                <Button className="mx-0 w-40">
                  {content.main.callToAction}
                </Button>
              </Link>
            </div>
            <div className="relative mx-auto aspect-[9/16] max-w-[15rem] shrink-0 grow basis-48 overflow-hidden">
              <Video
                url="/ChatSphere-landing.mp4"
                type="video/mp4"
                autoPlay
                loop
                className="absolute left-1/2 top-0 -translate-x-1/2 rounded-xl"
                style={{
                  clipPath:
                    "polygon(0% 10px, 100% 10px, 100% calc(100% - 10px), 0% calc(100% - 10px))",
                }}
              />
            </div>
          </div>
        </section>
        <section className="flex min-h-screen flex-col justify-center bg-accent/5 py-12">
          <h3 className="text-center text-xl font-semibold">
            {content.features.title}
          </h3>
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 px-4 pt-8">
            {content.features.features.map((feature, idx) => (
              <Card key={idx} {...feature} />
            ))}
          </div>
        </section>
        <Login />
        <footer className="bg-accent/10">
          <div className="mx-auto max-w-5xl border-t-2 border-accent/10 py-4 text-center">
            <small>
              {new Date().getFullYear()} &copy;{" "}
              <a
                href="https://github.com/mohamedalosaili/chatsphere"
                className="text-accent"
              >
                @Mohammed
              </a>
            </small>
          </div>
        </footer>
      </Scrollable>
    </div>
  );
};

export default Landing;
