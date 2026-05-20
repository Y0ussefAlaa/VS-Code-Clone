export interface IFile {
  id: string;
  name: string;
  firstFolder?: boolean;
  isFolder: boolean;
  children?: IFile[];
  content?: string;
}
