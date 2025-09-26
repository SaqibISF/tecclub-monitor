import React, { FC } from "react";
import Image from "next/image";

const Navbar: FC = () => (
  <nav className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3 border-b border-divider bg-background z-50">
    <div className="flex items-center gap-x-4">
      <a
        href="https://tecclubx.com/"
        target="_blank"
        className="flex items-center gap-x-1.5"
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-8 w-8"
        />
        <span className="text-lg font-black tracking-tight">TecClub</span>
      </a>
    </div>
  </nav>
);

export default Navbar;
