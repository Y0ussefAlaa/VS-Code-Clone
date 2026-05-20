import type { IFile } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

export const fileTree: IFile = {
  id: uuidv4(),
  name: "VS Code Clone",
  firstFolder: true,
  isFolder: true,
  children: [
    {
      id: uuidv4(),
      name: "node_modules",
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: ".vite",
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: "react.js",
              isFolder: false,
              content: `function BottomArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox="0 0 12 12"
      width={16}
      height={16}
      fill="#7d8590"
    >
      <path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"></path>
    </svg>
  );
}

export default BottomArrowIcon;
`,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      name: "public",
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: "index.tsx",
          isFolder: false,
          content: `vite.svg`,
        },
      ],
    },
    {
      id: uuidv4(),
      name: "src",
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: "components",
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: "button.jsx",
              isFolder: false,
              content: `export interface IFile {
  id: string;
  name: string;
  isFolder: boolean;
  children?: IFile[];
  content?: string;
}
`,
            },
            {
              id: uuidv4(),
              name: "data.ts",
              isFolder: false,
              content: `export const iconImagePaths: Record<string, string> = {
  // ** Files
  tsx: "icons/react_ts",
  jsx: "icons/react",
  html: "icons/html",
  js: "icons/javascript",
  ts: "icons/typescript",

  // Folders

  node_modules: "icons/folder-node",
  public: "icons/folder-public",
  src: "icons/folder-src",
  components: "icons/folder-components",
};
export const iconImagePaths: Record<string, string> = {
  // ** Files
  tsx: "icons/react_ts",
  jsx: "icons/react",
  html: "icons/html",
  js: "icons/javascript",
  ts: "icons/typescript",

  // Folders

  node_modules: "icons/folder-node",
  public: "icons/folder-public",
  src: "icons/folder-src",
  components: "icons/folder-components",
};

`,
            },
          ],
        },
      ],
    },
  ],
};
