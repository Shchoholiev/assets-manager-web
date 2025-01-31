import Editor from "@monaco-editor/react";
import { useMediaQuery } from "react-responsive";

function Asset({ language, text, height, readOnly = false }) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Editor
      options={{
        fontSize: isMobile ? 12 : 14,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
        readOnly,
        domReadOnly: readOnly,
        contextmenu: !readOnly,
        readOnlyMessage: {
          value: null,
        },
        automaticLayout: true,
        lineNumbersMinChars: isMobile && 2,
      }}
      width="99%"
      height={height}
      value={text}
      theme="custom"
      language={language}
    />
  );
}

export default Asset;
