import { useState, type ChangeEvent, type MouseEvent } from "react";
import type { IFile } from "../interfaces";

import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  setAddFile,
  setAddFolder,
  setChangeFileName,
  setClickedFile,
  setActiveContextMenuId,
  setOpenedFiles,
  setDeleteFile,
  setFileRenameId,
  setActiveAddTargetId,
} from "../app/features/fileTreeSlice";
import { existsObjInArr } from "../utils/functions";
import {
  CopyMinus,
  FolderPlusIcon,
  LucideFilePlusCorner,
  RotateCcw,
} from "lucide-react";
import FileIcon from "./SVG/File";
import FolderIcon from "./SVG/Folder";
import ContextMenu from "./ui/ContextMenu";

interface IProps {
  node: IFile;
}

const RecursiveComponent = ({ node }: IProps) => {
  const { openedFiles, myFiles, activeContextMenuId } = useAppSelector(
    (state) => state.tree,
  );

  const findNode = (tree: IFile, id: string): IFile | null => {
    if (tree.id === id) return tree;
    if (tree.children) {
      for (const child of tree.children) {
        const found = findNode(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const liveNode = findNode(myFiles, node.id) ?? node;
  const { id, isFolder, name, firstFolder } = liveNode;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInputFileOpen, setIsInputFileOpen] = useState<boolean>(false);
  const [isInputFolderOpen, setIsInputFolderOpen] = useState<boolean>(false);
  const isFileContextOpen = activeContextMenuId === id;
  const [isChangeFileNameInput, setISChangeFileNameInput] =
    useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();

  // ** Handlers

  const toggle = () => setIsOpen((prev) => !prev);
  const onClickedFile = () => {
    const exists = existsObjInArr(openedFiles, id);

    dispatch(
      setClickedFile({
        activeFileTabId: id,
        fileName: name,
        fileContent: undefined,   
      }),
    );

    if (!exists) {
      dispatch(setOpenedFiles([...openedFiles, liveNode]));
    }
  };

  const onAddFile = () => {
    setIsInputFileOpen(true);
    setIsInputFolderOpen(false);
  };

  const onAddFolder = () => {
    setIsInputFolderOpen(true);
    setIsInputFileOpen(false);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onOpenFileContextMenu = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setActiveAddTargetId(id));
    dispatch(setActiveContextMenuId(isFileContextOpen ? null : id));
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleChangeFileName = () => {
    dispatch(setFileRenameId(id));
    dispatch(setActiveContextMenuId(null));
    setISChangeFileNameInput(true);
    setInputValue(name);
  };

  const onDeleteFile = () => {
    dispatch(setDeleteFile(id));
    dispatch(setActiveContextMenuId(null));
  };

  return (
    <div className="  ml-3 cursor-pointer mt-3 ">
      <div className="relative flex items-center mb-2 hover:bg-gray-600 ">
        {isFolder ? (
          <div
            className={`flex items-center justify-between w-full pr-2 `}
            onContextMenu={onOpenFileContextMenu}
          >
            <div className="flex  items-center" onClick={toggle}>
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
              {/* <FolderIcon /> */}
              <RenderFileIcon
                fileName={name}
                isFolder={isFolder}
                isOpen={isOpen}
              />
              {isChangeFileNameInput ? (
                <input
                  autoFocus
                  type="text"
                  className="border rounded h-6 border-gray-400 outline-0 px-0.5 text-gray-200 bg-gray-600 ml-2"
                  onBlur={() => {
                    setISChangeFileNameInput(false);
                    setInputValue("");
                  }}
                  onClick={(e) => e.stopPropagation()}
                  value={inputValue}
                  onChange={onInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && inputValue.trim()) {
                      dispatch(setChangeFileName(inputValue));
                      setISChangeFileNameInput(false);
                      setInputValue("");
                    }
                    if (e.key === "Escape") {
                      setISChangeFileNameInput(false);
                      setInputValue("");
                    }
                  }}
                />
              ) : (
                <span className="ml-2 text-[15px]">{name}</span>
              )}
            </div>
            {firstFolder && (
              <div className="flex w-[35%] space-x-1.5">
                <button
                  className="p-0.5 hover:bg-gray-600 rounded-md cursor-pointer"
                  onClick={onAddFile}
                >
                  <LucideFilePlusCorner size={18} />
                </button>
                <button
                  className="p-0.5 hover:bg-gray-600 rounded-md cursor-pointer"
                  onClick={onAddFolder}
                >
                  <FolderPlusIcon size={18} />
                </button>
                <RotateCcw size={18} />
                <CopyMinus size={18} />
              </div>
            )}
          </div>
        ) : (
          <div
            onContextMenu={onOpenFileContextMenu}
            className="flex items-center  w-full px-1  "
            onClick={onClickedFile}
          >
            {isChangeFileNameInput ? (
              <input
                type="text"
                className="border rounded h-6 border-gray-400 outline-0 px-0.5 text-gray-200 bg-gray-600 "
                onBlur={() => {
                  setISChangeFileNameInput(false);
                  setInputValue("");
                }}
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(setChangeFileName(inputValue));
                    setISChangeFileNameInput(false);
                    setInputValue("");
                  }
                  if (e.key === "Escape") {
                    setISChangeFileNameInput(false);
                    setInputValue("");
                  }
                }}
              />
            ) : (
              <>
                <RenderFileIcon fileName={name} />
                <span className="ml-2">{name}</span>
              </>
            )}
          </div>
        )}
      </div>
      {liveNode.children &&
        isOpen &&
        liveNode.children.map((file) => (
          <RecursiveComponent key={file.id} node={file} />
        ))}
      {isInputFileOpen && (
        <div className="flex space-x-2 items-center ">
          <FileIcon w={15} h={15} />
          <input
            type="text"
            className="border rounded h-6 border-gray-400 outline-0 px-0.5 text-gray-200 bg-gray-600 "
            onBlur={() => {
              setIsInputFileOpen(false);
              setInputValue("");
            }}
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                dispatch(setAddFile({ name: inputValue, parentId: id }));
                setIsInputFileOpen(false);
                setInputValue("");
              }
            }}
          />
        </div>
      )}
      {isFileContextOpen && (
        <ContextMenu
          position={menuPosition}
          setShowMenu={() => dispatch(setActiveContextMenuId(null))}
        >
          {isFolder && (
            <>
              <li
                className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
                role="menuitem"
                onClick={() => {
                  setIsInputFileOpen(true);
                  dispatch(setActiveContextMenuId(null));
                }}
              >
                New File
              </li>
              <li
                className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
                role="menuitem"
                onClick={() => {
                  setIsInputFolderOpen(true);
                  dispatch(setActiveContextMenuId(null));
                }}
              >
                New Folder
              </li>
            </>
          )}
          <li
            className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
            role="menuitem"
            onClick={handleChangeFileName}
          >
            Rename
          </li>
          <li
            className="text-gray-400 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 duration-300 rounded-sm"
            role="menuitem"
            onClick={onDeleteFile}
          >
            Delete
          </li>
        </ContextMenu>
      )}
      {isInputFolderOpen && (
        <div className="flex space-x-1.5 items-center ">
          <RightArrowIcon />
          <FolderIcon />
          <input
            type="text"
            className="border rounded h-6 border-gray-400 outline-0 px-0.5 text-gray-200 bg-gray-600  "
            onBlur={() => {
              setIsInputFolderOpen(false);
              setInputValue("");
            }}
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                dispatch(setAddFolder({ name: inputValue, parentId: id }));
                setIsInputFolderOpen(false);
                setInputValue("");
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default RecursiveComponent;
