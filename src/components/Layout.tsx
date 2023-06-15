import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => (
  <div className="h-screen overflow-hidden md:grid grid-cols-[minmax(8rem,_28rem)_minmax(32rem,_1fr)]">
    {children}
  </div>
);

export default Layout;
