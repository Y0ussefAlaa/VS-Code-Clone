import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setOpenedFiles } from "../../app/features/fileTreeSlice";

interface IProps {
  setShowMenu: (val: boolean) => void;
  position: { x: number; y: number };
}

const ContextMenu = ({ position: { x, y }, setShowMenu }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { openedFiles, closesTabId } = useAppSelector((state) => state.tree);

  //   ** Handlers

  const onClose = () => {
    const filtered = openedFiles.filter((file) => file.id !== closesTabId);
    dispatch(setOpenedFiles(filtered));
    setShowMenu(false);
  };
  const onCloseAll = () => {
    dispatch(setOpenedFiles([]));
    setShowMenu(false);
  };

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
        <li
          className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
          role="menuitem"
          onClick={onClose}
        >
          Close
        </li>
        <li
          className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
          role="menuitem"
          onClick={onCloseAll}
        >
          Close All
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
