// interface IProps {}

import { useState } from "react";
import { useAppSelector } from "../app/store";
import OpenFilesBarTab from "./OpenFilesBarTab";
import ContextMenu from "./ui/ContextMenu";

const OpenFilesBar = () => {
  const { openedFiles } = useAppSelector((state) => state.tree);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div
      className="flex items-center "
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(true);
        setMenuPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      {openedFiles.map((file) => (
        <OpenFilesBarTab file={file} key={file.id} />
      ))}
      {showMenu && (
        <ContextMenu position={menuPosition} setShowMenu={setShowMenu} />
      )}
    </div>
  );
};

export default OpenFilesBar;
