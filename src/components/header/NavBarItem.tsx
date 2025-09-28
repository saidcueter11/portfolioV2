export const NavBarItem = ({ text, href, currentPath }: { text: string, href: string, currentPath: string }) => {
  const isActive = currentPath === href

  return (
    <li>
      <a class={`relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 ${isActive ? 'after:scale-x-100 after:h-[2px]' : ''}`} href={href}>{text}</a>
    </li>
  )
}
