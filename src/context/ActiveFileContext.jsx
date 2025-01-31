import { createContext, useContext, useState } from "react";
import { useAsset } from "../components/assets/useAsset";

const ActiveFileContext = createContext();

export function ActiveFileProvider({ children }) {
  const { asset } = useAsset();
  const [activeFile, setActiveFile] = useState(asset.primaryCodeFile);

  return (
    <ActiveFileContext.Provider value={{ activeFile, setActiveFile }}>
      {children}
    </ActiveFileContext.Provider>
  );
}

export function useActiveFile() {
  return useContext(ActiveFileContext);
}
