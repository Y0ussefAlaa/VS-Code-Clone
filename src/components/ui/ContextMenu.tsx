import { useEffect, useRef, type ReactNode } from "react";


interface IProps {
  setShowMenu: (val: boolean) => void;
  position: { x: number; y: number };
  children: ReactNode;
}

const ContextMenu = ({ position: { x, y }, setShowMenu, children }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event?.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div ref={menuRef}>
      <ul
        className="z-10 w-32 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        style={{
          position: "absolute", 
          left: x,
          top: y,
        }}
      >
        {children}
      </ul>
    </div>
  );
};

export default ContextMenu;
