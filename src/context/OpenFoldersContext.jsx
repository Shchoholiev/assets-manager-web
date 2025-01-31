import { createContext, useContext, useState } from "react";
import { useAsset } from "../components/assets/useAsset";

const OpenFoldersContext = createContext();

export function OpenFoldersProvider({ children }) {
  const { asset } = useAsset();
  const [openFolders, setOpenFolders] = useState({[asset.rootFolder.id] : true});

  const toggleFolder = (folderId) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <OpenFoldersContext.Provider value={{ openFolders, toggleFolder }}>
      {children}
    </OpenFoldersContext.Provider>
  );
}

export function useOpenFolders() {
  return useContext(OpenFoldersContext);
}
