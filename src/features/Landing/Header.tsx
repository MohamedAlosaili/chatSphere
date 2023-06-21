import Button from "@/components/Button";
import Link from "next/link";

import landing from "@/content/landing.json";

const Header = () => {
  const content = landing["en"];
  return (
    <header className="sticky left-0 top-0 z-10 h-24 bg-bcolor before:absolute before:inset-0 before:bg-accent/10">
      <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center justify-between gap-4 border-b-2 border-accent/10 px-4 shadow-current">
        <h2 className="text-2xl font-semibold text-tcolor">
          {content.header.title}
        </h2>
        <Link href="#login">
          <Button>{content.header.button}</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
