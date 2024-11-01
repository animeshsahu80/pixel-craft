"use client";
import Link from "next/link";

import React from "react";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "../../constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
const MobileNav = () => {
  const pathName = usePathname();

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="assets/images/logo-text.svg"
          alt="logo"
          width={100}
          height={100}
        />
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton></UserButton>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Image
                  src="/assets/icons/menu.svg"
                  alt="menu"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle></SheetTitle>
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={180}
                  height={50}
                />
                <div className="flex flex-col justify-between py-4 h-full w-full">
                  <ul className=" space-y-4">
                    {navLinks.slice(0, 6).map((link) => {
                      const isActive = link.route === pathName;
                      return (
                        <li
                          key={link.route}
                          className={`sidebar-nav_element group rounded-xl transition duration-100 transform 
                          ${
                            isActive
                              ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-md"
                              : "text-gray-800"
                          } 
                          hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500`}
                        >
                          <Link
                            className="sidebar-link flex items-center gap-4 p-3 rounded-xl"
                            href={link.route}
                          >
                            <Image
                              src={link.icon}
                              alt="icon"
                              width={24}
                              height={24}
                            />
                            <span className="text-base font-semibold transition duration-300">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Second set of navigation links */}
                  <ul className=" space-y-4">
                    {navLinks.slice(6, 8).map((link) => {
                      const isActive = link.route === pathName;
                      return (
                        <li
                          key={link.route}
                          className={` group rounded-xl transition duration-100 transform 
                          ${
                            isActive
                              ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-md"
                              : "text-gray-800"
                          } 
                          hover:scale-105 hover:shadow-lg hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-500`}
                        >
                          <Link
                            className=" flex items-center gap-4 p-3 rounded-xl"
                            href={link.route}
                          >
                            <Image
                              src={link.icon}
                              alt="icon"
                              width={24}
                              height={24}
                            />
                            <span className="text-base font-semibold transition duration-300">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                    <li className="flex cursor-pointer px-4 py-4">
                      <UserButton showName />
                    </li>
                  </ul>
                </div>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="bg-purple-gradient button bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
