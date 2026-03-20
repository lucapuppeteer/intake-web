"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetTitle>
          <Logo size="sm" />
        </SheetTitle>
        <nav className="mt-8 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <div className="my-2 h-px bg-border" />
          <Button asChild className="mt-2 w-full">
            <a href="https://calendly.com/luca-ka3s" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              Book a Call
            </a>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
