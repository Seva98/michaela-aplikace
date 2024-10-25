'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavbarLink from './navbarLink';
import { navbarLinks } from './constants';
import Typography from '../ui/typography';
import { cn } from '@/utils/cn';
import { Route } from 'next';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="flex flex-col items-start justify-between px-12 py-4 lg:items-center lg:flex-row">
      <div className="flex items-center justify-between w-full lg:w-auto">
        <Link href="/" className="flex items-center flex-1 gap-3">
          <Image src="/icon.jpg" alt="Logo" width={50} height={50} />
          <Typography variant="h2" className="tracking-tighter py-2 pr-1">
            Michaela Ševčík
          </Typography>
        </Link>
        <div className={cn('lg:hidden')} onClick={toggleMenu} aria-label="Toggle menu">
          <div className="relative w-6 h-6 ">
            <span
              className="absolute block w-full h-[2px] transition-all duration-500 bg-teal-700"
              style={{
                top: isMenuOpen ? '50%' : '30%',
                transform: isMenuOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
              }}
            ></span>
            <span
              className="absolute block w-full h-[2px] transition-all duration-500 bg-teal-800"
              style={{
                top: '50%',
                opacity: isMenuOpen ? 0 : 1,
              }}
            ></span>
            <span
              className="absolute block w-full h-[2px] transition-all duration-500 bg-teal-900"
              style={{
                top: isMenuOpen ? '50%' : '70%',
                transform: isMenuOpen ? 'translateY(-50%) rotate(-45deg)' : 'none',
              }}
            ></span>
          </div>
        </div>
      </div>
      <nav className={cn(`${isMenuOpen ? 'py-2' : ''}`)}>
        <div className={`flex ${isMenuOpen ? 'flex-col' : 'hidden'} lg:flex-row justify-center lg:space-x-4 text-lg list-none lg:block`}>
          {navbarLinks.map(({ href, text }) => (
            <NavbarLink key={href} href={href as Route} text={text} />
          ))}
        </div>
      </nav>
      {isMenuOpen && <hr className="w-full" />}
    </div>
  );
}
