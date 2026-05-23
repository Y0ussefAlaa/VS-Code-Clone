import type { IFile } from "../../interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface IClickedFile {
  fileName: string;
  fileContent: string | undefined;
  activeFileTabId: string | null;
}

interface IIntialState {
  myFiles: IFile;
  openedFiles: IFile[];
  clickedFile: IClickedFile;
  closesTabId: string | null;
  activeContextMenuId: string | null;
  fileRenameId: string | null;
  activeAddTargetId: string | null;
}

const initialState: IIntialState = {
  fileRenameId: null,
  myFiles: {
    id: uuidv4(),
    name: "VS Code Clone",
    firstFolder: true,
    isFolder: true,
    children: [],
  },
  clickedFile: {
    activeFileTabId: null,
    fileName: "",
    fileContent: "",
  },
  closesTabId: null,
  activeAddTargetId: null,

  openedFiles: [],
  activeContextMenuId: null,
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      const findContent = (tree: IFile): string | undefined => {
        if (tree.id === action.payload.activeFileTabId) return tree.content;
        if (tree.children) {
          for (const child of tree.children) {
            const found = findContent(child);
            if (found !== undefined) return found;
          }
        }
        return undefined;
      };

      state.clickedFile = {
        ...action.payload,
        fileContent: findContent(state.myFiles),
      };
    },
    setClosedTabId: (state, action: PayloadAction<string | null>) => {
      state.closesTabId = action.payload;
    },
    setCloseAllTabs: (state) => {
      state.openedFiles = [];
      state.clickedFile = {
        activeFileTabId: null,
        fileName: "",
        fileContent: "",
      };
    },
    setActiveContextMenuId: (state, action: PayloadAction<string | null>) => {
      state.activeContextMenuId = action.payload;
    },
    setAddFile: (
      state,
      action: PayloadAction<{ name: string; parentId: string }>,
    ) => {
      const newFile: IFile = {
        id: uuidv4(),
        isFolder: false,
        name: action.payload.name,
      };

      const findAndAdd = (tree: IFile): void => {
        if (tree.id === action.payload.parentId) {
          tree.children = [...(tree.children ?? []), newFile];
          return;
        }
        if (tree.children) {
          for (const child of tree.children) findAndAdd(child);
        }
      };

      findAndAdd(state.myFiles);
    },

    setAddFolder: (
      state,
      action: PayloadAction<{ name: string; parentId: string }>,
    ) => {
      const newFolder: IFile = {
        id: uuidv4(),
        isFolder: true,
        name: action.payload.name,
      };

      const findAndAdd = (tree: IFile): void => {
        if (tree.id === action.payload.parentId) {
          tree.children = [...(tree.children ?? []), newFolder];
          return;
        }
        if (tree.children) {
          for (const child of tree.children) findAndAdd(child);
        }
      };

      findAndAdd(state.myFiles);
    },
    setChangeFileName: (state, action: PayloadAction<string>) => {
      const findAndRename = (children: IFile[]): void => {
        for (const child of children) {
          if (child.id === state.fileRenameId) {
            child.name = action.payload;
            return;
          }
          if (child.children) {
            findAndRename(child.children);
          }
        }
      };
      if (state.myFiles.children) {
        findAndRename(state.myFiles.children);
      }
    },
    setDeleteFile: (state, action: PayloadAction<string | null>) => {
      const findAndDelete = (children: IFile[]): IFile[] => {
        return children
          .filter((child) => child.id !== action.payload)
          .map((child) => ({
            ...child,
            children: child.children
              ? findAndDelete(child.children)
              : undefined,
          }));
      };

      if (state.myFiles.children) {
        state.myFiles.children = findAndDelete(state.myFiles.children);
      }
    },
    setFileRenameId: (state, action: PayloadAction<string | null>) => {
      state.fileRenameId = action.payload;
    },
    setActiveAddTargetId: (state, action: PayloadAction<string | null>) => {
      state.activeAddTargetId = action.payload;
    },
    setFileContent: (
      state,
      action: PayloadAction<{ id: string; content: string }>,
    ) => {
      const findAndUpdate = (tree: IFile): void => {
        if (tree.id === action.payload.id) {
          tree.content = action.payload.content;
          return;
        }

        if (tree.children) {
          for (const child of tree.children) {
            findAndUpdate(child);
          }
        }
      };

      findAndUpdate(state.myFiles);

      if (state.clickedFile.activeFileTabId === action.payload.id) {
        state.clickedFile.fileContent = action.payload.content;
      }
    },
  },
});

export const {
  setOpenedFiles,
  setClickedFile,
  setCloseAllTabs,
  setClosedTabId,
  setAddFile,
  setAddFolder,
  setActiveContextMenuId,
  setChangeFileName,
  setDeleteFile,
  setFileRenameId,
  setActiveAddTargetId,
  setFileContent,
} = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
