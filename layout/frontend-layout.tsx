import React from "react";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
     return <div className="relative px-5 md:px-0 md:container mx-auto">{children}</div>;
};

export default FrontendLayout;
