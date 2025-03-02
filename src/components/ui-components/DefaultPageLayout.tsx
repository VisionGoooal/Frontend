import React from "react";
import LoggedInNavBar from "../navbars-components/LoggedInNavBar"

interface DefaultPageLayoutProps {
  children: React.ReactNode;
}

const DefaultPageLayout: React.FC<DefaultPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <LoggedInNavBar />
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default DefaultPageLayout;
