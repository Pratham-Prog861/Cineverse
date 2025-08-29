"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clapperboard, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'transition-colors hover:text-foreground/80',
          pathname === link.href ? 'text-foreground' : 'text-foreground/60',
          isMobile && 'py-2 text-lg'
        )}
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              StreamVerse
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {renderNavLinks()}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 pt-10">
            <Link href="/" className="flex items-center space-x-2 mb-6 pl-6">
              <Clapperboard className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">StreamVerse</span>
            </Link>
            <div className="flex flex-col space-y-3 pl-6">
              {renderNavLinks(true)}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-center md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-primary" />
            <span className="font-bold">StreamVerse</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
