"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignedIn, UserButton, SignedOut } from "@clerk/nextjs";
import { navLinks } from "../../constants";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const pathName = usePathname();
  return (

    <aside className="sidebar h-full w-64 bg-gradient-to-b from-gray-50 to-gray-200 shadow-2xl p-6">
      <div className="flex h-full flex-col gap-8">
        <Link href="/" className="flex items-center mb-8">
          <Image
            src="assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
            className="hover:opacity-90 transition-opacity duration-300"
          />
        </Link>
        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          <SignedIn>
              <ul className="sidebar-nav_elements space-y-4">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathName;
                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group rounded-xl transition duration-100 transform 
                                ${
                                  isActive
                                    ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-md"
                                    : "text-gray-800 text-gray-800"
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
              <ul className="sidebar-nav_elements space-y-4">
                {navLinks.slice(6, 8).map((link) => {
                  const isActive = link.route === pathName;
                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group rounded-xl transition duration-100 transform 
                                ${
                                  isActive
                                    ? "bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-md"
                                    : "text-gray-800 text-gray-800"
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
                <li className="flex-center cursor-pointer px-4 py-4">
                  <UserButton showName></UserButton>
                </li>
              </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className="bg-purple-gradient button bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
