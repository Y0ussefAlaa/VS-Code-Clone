import { useState, type ChangeEvent } from "react";
import type { IFile } from "../interfaces";

import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  setAddFile,
  setAddFolder,
  setClickedFile,
  setOpenedFiles,
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

interface IProps {
  node: IFile;
}

const RecursiveComponent = ({ node }: IProps) => {
  const { openedFiles, myFiles } = useAppSelector((state) => state.tree);

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
  const { id, isFolder, name, children, content, firstFolder } = liveNode;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isInputFileOpen, setIsInputFileOpen] = useState<boolean>(false);
  const [isInputFolderOpen, setIsInputFolderOpen] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();

  // ** Handlers

  const toggle = () => setIsOpen((prev) => !prev);
  const onClickedFile = () => {
    const exists = existsObjInArr(openedFiles, id);
    dispatch(
      setClickedFile({
        activeFileTabId: id,
        fileContent: content,
        fileName: name,
      }),
    );
    if (!exists) {
      dispatch(setOpenedFiles([...openedFiles, node]));
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

  const onOpenFileContextMenu = () => {
    console.log("asdfas");
  };

  return (
    <div className="relative  ml-3 cursor-pointer mt-3 ">
      <div className=" flex items-center mb-2 hover:bg-gray-600 ">
        {isFolder ? (
          <div className={`flex items-center justify-between w-full pr-2 `}>
            <div className="flex  items-center" onClick={toggle}>
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
              {/* <FolderIcon /> */}
              <RenderFileIcon
                fileName={name}
                isFolder={isFolder}
                isOpen={isOpen}
              />
              <span className="ml-2 text-[15px]">{name}</span>
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
            <RenderFileIcon fileName={name} />
            <span className="ml-2">{name}</span>
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
              if (e.key === "Enter") {
                dispatch(setAddFile(inputValue));
                setIsInputFileOpen(false);
                setInputValue("");
              }
            }}
          />
        </div>
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
              if (e.key === "Enter") {
                dispatch(setAddFolder(inputValue));
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
