// interface IProps {}

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import OpenFilesBarTab from "./OpenFilesBarTab";
import ContextMenu from "./ui/ContextMenu";
import {
  setClickedFile,
  setCloseAllTabs,
  setOpenedFiles,
} from "../app/features/fileTreeSlice";

const OpenFilesBar = () => {
  const { openedFiles, closesTabId, clickedFile } = useAppSelector(
    (state) => state.tree,
  );
  const dispatch = useAppDispatch();

  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const onClose = () => {
    const filtered = openedFiles.filter((file) => file.id !== closesTabId);
    dispatch(setOpenedFiles(filtered));

    if (closesTabId === clickedFile.activeFileTabId) {
      const lastFile = filtered[filtered.length - 1];
      if (lastFile) {
        dispatch(
          setClickedFile({
            activeFileTabId: lastFile.id,
            fileName: lastFile.name,
            fileContent: lastFile.content,
          }),
        );
      } else {
        dispatch(setCloseAllTabs());
      }
    }
    setShowMenu(false);
  };

  const onCloseAll = () => {
    dispatch(setCloseAllTabs());
    setShowMenu(false);
  };

  return (
    <div
      className="flex items-center"
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(true);
        setMenuPosition({ x: e.clientX, y: e.clientY });
      }}
    >
      {openedFiles.map((file) => (
        <OpenFilesBarTab file={file} key={file.id} /> 
      ))}
      {showMenu && (
        <ContextMenu position={menuPosition} setShowMenu={setShowMenu}>
          <li
            className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
            role="menuitem"
            onClick={onClose}
          >
            Close
          </li>
          <li
            className="text-gray-400 z-30 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
            role="menuitem"
            onClick={onCloseAll}
          >
            Close All
          </li>
        </ContextMenu>
      )}
    </div>
  );
};

export default OpenFilesBar;
