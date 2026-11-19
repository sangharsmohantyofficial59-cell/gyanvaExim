"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, navigation } from "../../lib/site-config";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link
          className="site-brand"
          href="/"
          aria-labelledby="site-brand-name site-brand-tagline"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={company.logo}
            alt="Gyanav Exim circular company emblem"
            width={58}
            height={58}
            priority
          />
          <span className="site-brand-copy">
            <span className="site-brand-name" id="site-brand-name">{company.brand}</span>
            <span className="site-brand-tagline" id="site-brand-tagline">{company.tagline}</span>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <div className="primary-links">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            className="header-cta"
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            Let&apos;s Discuss Your Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
