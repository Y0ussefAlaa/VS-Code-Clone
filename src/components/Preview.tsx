import { useAppSelector } from "../app/store";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenFilesBar from "./OpenFilesBar";

const Preview = () => {
  const {
    clickedFile: { fileContent },
  } = useAppSelector((state) => state.tree);
  return (
    <>
      <OpenFilesBar />
      <FileSyntaxHighlighter content={fileContent} />
    </>
  );
};

export default Preview;
