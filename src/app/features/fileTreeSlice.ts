import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFile } from "../../interfaces";

interface IClickedFile {
  fileName: string;
  fileContent: string | undefined;
  activeFileTabId: string | null;
}

interface IIntialState {
  openedFiles: IFile[];
  clickedFile: IClickedFile;
  closesTabId: string | null;
}

const initialState: IIntialState = {
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
  },
});

export const { setOpenedFiles, setClickedFile, setClosedTabId } =
  fileTreeSlice.actions;

export default fileTreeSlice.reducer;
