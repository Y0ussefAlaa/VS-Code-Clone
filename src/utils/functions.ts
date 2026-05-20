import type { IFile } from "../interfaces";

export const existsObjInArr = (arr : IFile[] , id:string) =>{
    return arr.some(obj => obj.id === id);
}
