import { useState } from "react";
import type { IFile } from "../interfaces";

import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useAppDispatch, useAppSelector } from "../app/store";
import { setClickedFile, setOpenedFiles } from "../app/features/fileTreeSlice";
import { existsObjInArr } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, isFolder, name, children, content } = fileTree;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { openedFiles } = useAppSelector((state) => state.tree);

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
    if (exists) return;
    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };

  return (
    <div className="ml-3 cursor-pointer mt-3">
      <div className="flex items-center mb-2">
        {isFolder ? (
          <div className="flex items-center " onClick={toggle}>
            {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            {/* <FolderIcon /> */}
            <RenderFileIcon
              fileName={name}
              isFolder={isFolder}
              isOpen={isOpen}
            />
            <span className="ml-2">{name}</span>
          </div>
        ) : (
          <div
            className="flex items-center"
            onClick={() => dispatch(onClickedFile)}
          >
            <RenderFileIcon fileName={name} />
            <span className="ml-2">{name}</span>
          </div>
        )}
      </div>
      {children &&
        isOpen &&
        children.map((file, idx) => (
          <RecursiveComponent key={idx} fileTree={file} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
