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
      class={`w-full flex justify-center bg-ligth-accent fixed top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""
        }`}
    >
      <nav class="flex py-5 justify-between items-center w-full max-w-6xl px-6">
        <div className='flex items-center md:gap-6 h-fit w-full sm:w-fit'>
          <LogoIcon />
          <div className="min-h-12 flex items-center justify-center sm:block sm:w-fit w-full">
            {currentPath !== '/' &&
              <>
                {children}
                <p className="sm:hidden font-bricolage font-semibold text-dark-green text-xl">{headerTitle}</p>
              </>}
          </div>
        </div>
        <ul
          class="hidden sm:flex justify-end items-center gap-6 font-bricolage text-ligth-green"
        >
          <NavBarItem currentPath={currentPath} href="/" text="Home" />
          <NavBarItem currentPath={currentPath} href="/projects" text="Projects" />
          <NavBarItem currentPath={currentPath} href="/experience" text="Experience" />
          <NavBarItem currentPath={currentPath} href="/contact" text="Contact" />

          <li class="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-5 py-2.5 font-medium text-dark-green cursor-pointer">
            <span>Resume</span><div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-300 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100"><RightArrowIcon /></div>
          </li>
        </ul>

        <button onClick={() => setToggleMenu(prev => !prev)} class='sm:hidden'>
          <MenuIcon />
        </button>
      </nav>
      <SideMenu toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
    </header>
  )
}
