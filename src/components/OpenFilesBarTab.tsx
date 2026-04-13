import {
  setClickedFile,
  setClosedTabId,
  setOpenedFiles,
} from "../app/features/fileTreeSlice";
import { useAppDispatch, useAppSelector } from "../app/store";
import type { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/Close";

interface IProps {
  file: IFile;
}

const OpenFilesBarTab = ({ file }: IProps) => {
  const { openedFiles, clickedFile } = useAppSelector((state) => state.tree);
  const dispatch = useAppDispatch();
  const { id, name, content } = file;
  // ** Handlers

  const onClick = () => {
    dispatch(
      setClickedFile({
        fileContent: content,
        fileName: name,
        activeFileTabId: id,
      }),
    );
  };

  const onRemove = (selectId: string) => {
    const filtered = openedFiles.filter((file) => file.id !== selectId);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFiles([]));
      dispatch(
        setClickedFile({
          activeFileTabId: null,
          fileContent: "",
          fileName: "",
        }),
      );
      return;
    }
    const { id, name, content } = lastTab;
    dispatch(setOpenedFiles(filtered));
    dispatch(
      setClickedFile({
        activeFileTabId: id,
        fileContent: content,
        fileName: name,
      }),
    );
  };

  return (
    <div
      className={`flex items-center space-x-2.5 p-2.5 border-t-2 ${id === clickedFile.activeFileTabId ? "border-[#6fcccf]" : "border-transparent"}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setClosedTabId(id));
      }}
    >
      <RenderFileIcon fileName={file.name} />
      <span>{file.name}</span>
      <span
        className="hover:bg-gray-700 cursor-pointer rounded"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenFilesBarTab;
