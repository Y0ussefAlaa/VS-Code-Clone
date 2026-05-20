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
}

const initialState: IIntialState = {
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
  openedFiles: [],
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFiles: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
    setClickedFile: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
    setClosedTabId: (state, action: PayloadAction<string | null>) => {
      state.closesTabId = action.payload;
    },
    setAddFile: (state, action: PayloadAction<string>) => {
      state.myFiles.children = state.myFiles.children
        ? [
            ...state.myFiles.children,
            { id: uuidv4(), isFolder: false, name: action.payload },
          ]
        : [{ id: uuidv4(), isFolder: false, name: action.payload }];
    },
    setAddFolder: (state, action: PayloadAction<string>) => {
      state.myFiles.children = state.myFiles.children
        ? [
            ...state.myFiles.children,
            { id: uuidv4(), isFolder: true, name: action.payload },
          ]
        : [{ id: uuidv4(), isFolder: false, name: action.payload }];
    },
  },
});

export const {
  setOpenedFiles,
  setClickedFile,
  setClosedTabId,
  setAddFile,
  setAddFolder,
} = fileTreeSlice.actions;

export default fileTreeSlice.reducer;
