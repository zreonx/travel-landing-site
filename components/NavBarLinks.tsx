"use client";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";

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

export const NavigationLinks = ({
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
