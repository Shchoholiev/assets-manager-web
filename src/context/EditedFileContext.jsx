import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export function EditedFileProvider({ children }) {
  const [editingFileId, setEditingFileId] = useState(null);

  return (
    <FileContext.Provider value={{ editingFileId, setEditingFileId }}>
      {children}
    </FileContext.Provider>
  );
}

export function useEditedFileContext() {
  return useContext(FileContext);
}
