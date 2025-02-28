import styled from "styled-components";
import { useOpenFolders } from "../../context/OpenFoldersContext.jsx";
import File from "./File.jsx";
import Folder from "./Folder.jsx";
import { useEditedFolderContext } from "../../context/EditedFolderContext.jsx";
import { useEffect, useState } from "react";
import { useEditedFileContext } from "../../context/EditedFileContext.jsx";

const FolderTreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;
const OpenedFolderContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
  border-left: 1px solid var(--gray-500);
`;

function FolderTree({ folder, readOnly = true }) {
  const { openFolders } = useOpenFolders();
  const isOpen = openFolders[folder.id] || false;
  const { setEditingFolderId } = useEditedFolderContext();
  const [newFolderId, setNewFolderId] = useState(null);
  const { setEditingFileId } = useEditedFileContext();
  const [newFileId, setNewFileId] = useState(null);

  useEffect(() => {
    if (newFolderId) {
      setEditingFolderId(newFolderId);
      setNewFolderId(null);
    }
  }, [newFolderId, setEditingFolderId]);

  useEffect(() => {
    if (newFileId) {
      setEditingFileId(newFileId);
      setNewFileId(null);
    }
  }, [newFileId, setEditingFileId]);

  const handleFolderCreated = (newFolderId) => {
    setNewFolderId(newFolderId);
  };

  const handleFileCreated = (newFileId) => {
    setNewFileId(newFileId);
  };
  return (
    <FolderTreeContainer>
      <Folder
        folder={folder}
        readOnly={readOnly}
        onFolderCreated={handleFolderCreated}
        onFileCreated={handleFileCreated}
      />
      {isOpen && (
        <OpenedFolderContent>
          {folder.items.map((item) =>
            item.type === 0 ? (
              <FolderTree key={item.id} folder={item} readOnly={readOnly} />
            ) : (
              <File key={item.id} file={item} readOnly={readOnly} />
            )
          )}
        </OpenedFolderContent>
      )}
    </FolderTreeContainer>
  );
}
export default FolderTree;
