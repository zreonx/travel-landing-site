"use client";

import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";
import Button from "./Button";
import React, { useEffect, useState } from "react";
import useScreenType from "react-screentype-hook";

type NavigationLinksType = {
  screenType: {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
  };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavigationLinks = ({
  isOpen,
  setIsOpen,
  screenType: { isMobile, isTablet },
}: NavigationLinksType) => {
  return (
    <ul
      className={`${
        isTablet || isMobile
          ? "fixed w-[240px] top-0 right-0 bg-gray-100 z-50 h-screen lg:flex flex-col gap-8"
          : "h-full gap-12 lg:flex"
      } ${!isOpen && "hidden"}`}
    >
      <li className='flex justify-end p-5 lg:hidden'>
        <button className='' onClick={() => setIsOpen(false)}>
          <Image src='/close.png' alt='close' width={24} height={24} />
        </button>
      </li>

      {NAV_LINKS.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className='regular-16 max-lg:mb-8 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold'
        >
          {link.label}
        </Link>
      ))}
    </ul>
  );
};

const Navbar = () => {
  const screenType = useScreenType();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (screenType.isDesktop) {
        setIsOpen(false);
      }
    }
  }, [screenType]);

  return (
    <nav className='flexBetween max-container padding-container z-30 py-5 '>
      <Link href='/'>
        <Image src='/hilink-logo.svg' alt='logo' width={74} height={29} />
      </Link>
      <NavigationLinks
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        screenType={screenType}
      />
      <div className='lg:flexCenter hidden'>
        <Button
          type='button'
          title='Login'
          icon='/user.svg'
          variant='btn_dark_green'
        />
      </div>
      {!isOpen && (
        <Image
          src='/menu.svg'
          alt='menu'
          width={32}
          height={32}
          className='inline-block cursor-pointer lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </nav>
  );
};

export default Navbar;
