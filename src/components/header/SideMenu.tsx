import type React from "preact/compat"
import { CloseIcon } from "../icons/CloseIcon"
import { RedirectLinkIcon } from "../icons/RedirectLink"

interface SideMenuProps {
  toggleMenu: boolean
  setToggleMenu: (isOpen: boolean) => void
}

export const SideMenu: React.FC<SideMenuProps> = ({ toggleMenu, setToggleMenu }) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'sideMenuOverlay') {
      setToggleMenu(false)
    }
  }

  return (
    <aside
      id="sideMenuOverlay"
      onClick={handleOutsideClick}
      class={`${toggleMenu ? 'translate-x-0 backdrop-blur-sm' : 'translate-x-full'} transition duration-300 fixed w-full z-10 inset-0 h-full flex flex-col items-end`}
    >
      <div class="bg-ligth-green h-full w-2/4 p-4">
        <button onClick={() => setToggleMenu(false)}>
          <CloseIcon />
        </button>

        <div class='flex flex-col mt-4 gap-4 font-bricolage font-semibold items-center text-dark-green'>
          <a href='/' onClick={() => setToggleMenu(false)}>Home</a>
          <a href='/projects' onClick={() => setToggleMenu(false)}>Projects</a>
          <a href="/experience" onClick={() => setToggleMenu(false)}>Experience</a>
          <a href="/contact" onClick={() => setToggleMenu(false)}>Contact</a>
          <a href="/SaidCueterResume.pdf" target='_blank' className='flex gap-2 mt-8 rounded-full bg-accent px-6 py-1'>Resume<span><RedirectLinkIcon stroke="stroke-dark-green" /></span></a>
        </div>
      </div>
    </aside>
  )
}


