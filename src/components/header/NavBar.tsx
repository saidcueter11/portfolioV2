import { useEffect, useState } from "preact/hooks"
import { MenuIcon } from "../icons/MenuIcon"
import { SideMenu } from "./SideMenu"
import { RightArrowIcon } from "../icons/RigthArrowIcon"
import { NavBarItem } from "./NavBarItem"
import { LogoIcon } from "../icons/Logo"
import type React from "preact/compat"

export const NavBar = ({ currentPath, children, headerTitle }: { currentPath: string, children: React.ReactNode, headerTitle: string }) => {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      class={`w-full flex justify-center fixed top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md bg-ligth-accent/95 backdrop-blur-md" : "bg-ligth-accent"
        }`}
    >
      {/* Desktop nav */}
      <nav class="hidden sm:flex py-5 justify-between items-center w-full max-w-6xl px-6">
        <div className='flex items-center md:gap-6 h-fit'>
          <LogoIcon />
          {currentPath !== '/' && children}
        </div>
        <ul
          class="flex justify-end items-center gap-6 font-bricolage text-ligth-green"
        >
          <NavBarItem currentPath={currentPath} href="/" text="Home" />
          <NavBarItem currentPath={currentPath} href="/projects" text="Projects" />
          <NavBarItem currentPath={currentPath} href="/experience" text="Experience" />
          <NavBarItem currentPath={currentPath} href="/contact" text="Contact" />

          <a href="/SaidCueterResume.pdf" target='_blank'>
            <li class="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-5 py-2.5 font-medium text-ligth-accent cursor-pointer transition-all duration-300 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/20">
              <span>Resume</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-300 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><RightArrowIcon /></div>
            </li>
          </a>
        </ul>
      </nav>

      {/* Mobile nav */}
      <nav class="sm:hidden flex items-center justify-between w-full px-5 py-4">
        <a href="/" class="shrink-0">
          <LogoIcon />
        </a>
        <button
          onClick={() => setToggleMenu(prev => !prev)}
          class="p-2 -mr-2 rounded-lg active:bg-dark-green/10 transition-colors"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
      </nav>

      <SideMenu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} currentPath={currentPath} />
    </header>
  )
}
