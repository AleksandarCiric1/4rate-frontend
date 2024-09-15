import { Header } from "@/pages/shared/header";
import { Footer } from "../shared/footer";
import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

type MainPageLayout = {
  children: ReactNode;
};

const MainPageLayout = ({ children }: MainPageLayout) => {
  return (
    <>
      <Header></Header>
      <main>
        {children}
        {/* <Outlet /> */}
      </main>
      <Footer></Footer>
    </>
  );
};

export { MainPageLayout };
