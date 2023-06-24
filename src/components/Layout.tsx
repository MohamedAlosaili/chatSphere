import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => (
  <div className="relative h-screen overflow-hidden md:grid md:grid-cols-[20rem_1fr] lg:grid-cols-[minmax(20rem,_30rem)_minmax(40rem,_1fr)]">
    {children}
  </div>
);

export default Layout;
