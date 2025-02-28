import { HiChevronDown, HiChevronRight, HiOutlineTrash } from "react-icons/hi";
import { useOpenFolders } from "../../context/OpenFoldersContext";
import styled from "styled-components";
import { DropdownMenu } from "radix-ui";
import {
  HiOutlineDocumentPlus,
  HiOutlineEllipsisVertical,
  HiOutlineFolderPlus,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import {
  Operations,
  StyledContent,
  StyledItem,
  StyledToggle,
} from "../../styles/DropdownMenu";
import { useAsset } from "../assets/useAsset";
import { useEffect, useRef, useState } from "react";
import { useRenameFolder } from "./useRenameFolder";
import findParentFolder from "../../utils/findParentFolder";
import toast from "react-hot-toast";
import { useCreateFolder } from "./useCreateFolder";
import { useDeleteFolder } from "./useDeleteFolder";
import containsPrimaryCodeFile from "../../utils/containsPrimaryCodeFile";
import { useEditedFolderContext } from "../../context/EditedFolderContext";
import { useCreateFile } from "./useCreateFile";

const StyledFolder = styled.div`
  min-height: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px 0px;
  padding-left: 1rem;

  & svg {
    color: var(--white);
  }
  &:hover {
    background-color: var(--gray-400);
  }
`;
const Name = styled.input`
  pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};
  width: 100%;
  background-color: transparent;
  border: none;
`;

function Folder({ folder, readOnly = true, onFolderCreated, onFileCreated }) {
  const { openFolders, toggleFolder } = useOpenFolders();
  const { asset } = useAsset();
  const { renameFolder, isPending } = useRenameFolder();
  const { createFolder } = useCreateFolder();
  const { deleteFolder } = useDeleteFolder();
  const { createFile } = useCreateFile();

  const isOpen = openFolders[folder.id] || false;
  const { editingFolderId, setEditingFolderId } = useEditedFolderContext();
  const [name, setName] = useState(folder.name);
  const nameInputRef = useRef(null);
  const hasPrimaryCodeFile = containsPrimaryCodeFile(
    folder,
    asset.primaryCodeFile.id
  );

  useEffect(() => {
    if (editingFolderId === folder.id) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 10);
    }
  }, [editingFolderId, folder.id]);

  const handleRename = () => {
    if (name.trim() && name !== folder.name) {
      const parent = findParentFolder(asset.rootFolder, folder.id);
      if (parent) {
        const isDuplicate = parent.items.some(
          (f) =>
            f.id !== folder.id && f.name.toLowerCase() === name.toLowerCase()
        );
        if (isDuplicate) {
          toast.error("A file or folder with such name already exists");
          setName(folder.name);
          return;
        }
      }
      renameFolder({
        id: folder.id,
        name,
        parentId: parent?.id || null,
      });
    }
    setEditingFolderId(null);
  };

  const handleCreateFolder = () => {
    createFolder(
      { name: "", parentId: folder.id },
      {
        onSuccess: (newFolder) => {
          onFolderCreated(newFolder.id);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteFolder({ id: folder.id });
  };
  const handleCreateFile = () => {
    createFile(
      { name: "", text: "// Write your code here", parentId: folder.id },
      {
        onSuccess: (newFile) => {
          onFileCreated(newFile.id);
        },
      }
    );
  };
  return (
    <StyledFolder
      onClick={() => editingFolderId !== folder.id && toggleFolder(folder.id)}
    >
      {isOpen ? <HiChevronDown /> : <HiChevronRight />}

      <Name
        ref={editingFolderId === folder.id ? nameInputRef : null}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleRename}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleRename();
            e.target.blur();
          }
        }}
        isDisabled={editingFolderId !== folder.id || isPending}
      />

      {!readOnly && (
        <Operations isActive={isOpen}>
          <DropdownMenu.Root>
            <StyledToggle>
              <HiOutlineEllipsisVertical />
            </StyledToggle>

            <StyledContent>
              <StyledItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateFile();
                }}
              >
                <HiOutlineDocumentPlus /> New file
              </StyledItem>
              <StyledItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleCreateFolder();
                }}
              >
                <HiOutlineFolderPlus /> New folder
              </StyledItem>
              <StyledItem
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingFolderId(folder.id);
                }}
              >
                <HiOutlinePencilSquare />
                Rename
              </StyledItem>
              {!hasPrimaryCodeFile && (
                <StyledItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                >
                  <HiOutlineTrash /> Delete
                </StyledItem>
              )}
            </StyledContent>
          </DropdownMenu.Root>
        </Operations>
      )}
    </StyledFolder>
  );
}

export default Folder;
