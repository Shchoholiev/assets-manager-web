import { createContext, useContext, useState } from "react";

const FolderContext = createContext();

export function EditedFolderProvider({ children }) {
  const [editingFolderId, setEditingFolderId] = useState(null);

  return (
    <FolderContext.Provider value={{ editingFolderId, setEditingFolderId }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useEditedFolderContext() {
  return useContext(FolderContext);
}
