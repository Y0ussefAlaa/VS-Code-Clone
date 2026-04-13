import { iconImagePaths } from "../constants";
import IconImg from "./IconImg";
import FileIcon from "./SVG/File";

interface IProps {
  fileName: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const RenderFileIcon = ({ fileName, isFolder, isOpen }: IProps) => {
  const extension = fileName.split(".").pop();

  if (
    extension &&
    Object.prototype.hasOwnProperty.call(iconImagePaths, extension)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${iconImagePaths[extension]}-open.svg`
        : `${iconImagePaths[extension]}.svg`
      : `${iconImagePaths[extension]}.svg`;

    return <IconImg src={iconPath} />;
  }

  if (isFolder && isOpen)
    return <IconImg src="icons/folder-default-open.svg" />;
  if (isFolder && !isOpen) return <IconImg src="icons/folder-default.svg" />;

  return <FileIcon />;
};

export default RenderFileIcon;
