import { useEffect } from "preact/hooks"
import type React from "preact/compat"
import { CloseIcon } from "../icons/CloseIcon"
import { RedirectLinkIcon } from "../icons/RedirectLink"

interface SideMenuProps {
  toggleMenu: boolean
  setToggleMenu: (isOpen: boolean) => void
  currentPath: string
}

export const SideMenu: React.FC<SideMenuProps> = ({ toggleMenu, setToggleMenu, currentPath }) => {
  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [toggleMenu])

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'sideMenuOverlay') {
      setToggleMenu(false)
    }
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <aside
      id="sideMenuOverlay"
      onClick={handleOutsideClick}
      class={`${toggleMenu ? 'translate-x-0 backdrop-blur-md bg-dark-green/20' : 'translate-x-full'} transition-all duration-300 fixed w-full z-10 inset-0 h-full flex flex-col items-end`}
    >
      <div class="bg-gradient-to-b from-ligth-green to-dark-green h-full w-3/5 p-6 shadow-2xl flex flex-col">
        <button onClick={() => setToggleMenu(false)} class="self-end p-1 rounded-lg active:bg-white/10 transition-colors" aria-label="Close menu">
          <CloseIcon />
        </button>

        <nav class='flex flex-col gap-1 mt-8 font-bricolage font-semibold items-stretch text-lg'>
          {links.map(({ href, label }) => (
            <a
              href={href}
              onClick={() => setToggleMenu(false)}
              class={`py-3 px-4 rounded-lg transition-colors duration-200 ${
                currentPath === href
                  ? 'text-accent bg-white/10'
                  : 'text-ligth-accent hover:text-accent hover:bg-white/5'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div class="mt-auto pb-6 flex justify-center">
          <a href="/SaidCueterResume.pdf" target='_blank' className='flex gap-2 rounded-full bg-accent text-ligth-accent px-6 py-2.5 font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all duration-200 hover:bg-accent-hover'>
            Resume<span><RedirectLinkIcon stroke="stroke-ligth-accent" className="size-5" /></span>
          </a>
        </div>
      </div>
    </aside>
  )
}


