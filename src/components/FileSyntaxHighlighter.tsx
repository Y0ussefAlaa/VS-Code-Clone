import { useCallback, useEffect, type ChangeEvent } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useAppDispatch, useAppSelector } from "../app/store";
import { setFileContent } from "../app/features/fileTreeSlice";

const FileSyntaxHighlighter = () => {
  const dispatch = useAppDispatch();
  const { clickedFile } = useAppSelector((state) => state.tree);
  const content = clickedFile.fileContent ?? "";

  const onChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!clickedFile.activeFileTabId) return;

    dispatch(
      setFileContent({
        id: clickedFile.activeFileTabId,
        content: e.target.value,
      }),
    );
  };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault(); // prevent browser save dialog
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="relative w-full h-full overflow-auto">
      <textarea
        className="absolute top-0 left-0 w-full h-full outline-0 bg-transparent text-transparent resize-none z-10"
        style={{
          fontFamily: "monospace",
          fontSize: "1rem",
          lineHeight: "1.5",
          padding: "1rem",
          caretColor: "white",
          paddingLeft: "3.8rem",
        }}
        value={content ?? ""}
        onChange={onChangeTextArea}
        spellCheck={false}
      />
      <SyntaxHighlighter
        language="javascript"
        style={atomOneDark}
        customStyle={{
          fontFamily: "monospace",
          fontSize: "1rem",
          lineHeight: "1.5",
          padding: "1rem",
          backgroundColor: "transparent",
          width: "100%",
          minHeight: "100%",
          pointerEvents: "none",
        }}
        showLineNumbers
      >
        {content ?? ""}{" "}
      </SyntaxHighlighter>
    </div>
  );
};

export default FileSyntaxHighlighter;
