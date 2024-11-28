import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export function useDefineMonacoTheme() {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("custom", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "515151" },
          { token: "keyword", foreground: "FF32C6" },
          { token: "string", foreground: "C478FF" },
          { token: "number", foreground: "63B0AF" },
          { token: "type", foreground: "63B0AF" },
          { token: "identifier", foreground: "E7D1A1" },
          { token: "delimiter", foreground: "3FA4FF" },
          { token: "punctuation", foreground: "CF1C1C" },
          { token: "namespace", foreground: "63B0AF" },
        ],
        colors: {
          "editor.background": "#323232",
          "editorLineNumber.foreground": "#515151",
        },
      });
    }
  }, [monaco]);
}
