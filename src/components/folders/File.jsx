import styled from "styled-components";
import { useActiveFile } from "../../context/ActiveFileContext";
import { HiOutlineStar, HiOutlineTrash } from "react-icons/hi";
import {
  HiMiniStar,
  HiOutlineEllipsisVertical,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { DropdownMenu } from "radix-ui";
import { useAsset } from "../assets/useAsset";
import {
  Operations,
  StyledContent,
  StyledItem,
  StyledToggle,
} from "../../styles/DropdownMenu";
import { useRenameFile } from "./useRenameFile";
import { useEffect, useRef, useState } from "react";
import findParentFolder from "../../utils/findParentFolder";
import toast from "react-hot-toast";
import { detectLanguage } from "../../utils/detectLanguage";
import { useEditedFileContext } from "../../context/EditedFileContext";
import { useDeleteFile } from "./useDeleteFile";
import { useEditAsset } from "../assets/useEditAsset";
import { useMakePrimaryCodeFile } from "./useMakePrimaryCodeFile";

const StyledFile = styled.div`
  min-height: 2rem;
  display: flex;
  align-items: center;
  padding: 3px 0px;
  padding-left: 1rem;
  background-color: ${({ isActive }) =>
    isActive ? "var(--gray-500)" : "transparent"};
  cursor: pointer;
  &:hover {
    background-color: var(--gray-500);
  }
`;
const Name = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};
  &:disabled {
    background-color: transparent;
    cursor: pointer;
    color: var(--gray-200);
  }
`;
const Star = styled(HiMiniStar)`
  color: var(--yellow);
`;

function File({ file, readOnly = true }) {
  const { activeFile, setActiveFile } = useActiveFile();
  const { asset } = useAsset();
  const { makePrimaryCodeFile, isPending: isChangingFile } =
    useMakePrimaryCodeFile();
  const { renameFile } = useRenameFile();
  const { deleteFile, isPending: isDeleting } = useDeleteFile();
  const { editingFileId, setEditingFileId } = useEditedFileContext();
  const [name, setName] = useState(file.name);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (editingFileId === file.id) {
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 10);
    }
  }, [editingFileId, file.id]);
  useEffect(() => {
    let toastId = null;

    if (isChangingFile || isDeleting) {
      toastId = toast.loading("Applying changes...");
    }

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isChangingFile, isDeleting]);

  const handleRename = () => {
    if (name.trim() && name !== file.name) {
      const extensionRegex = /\.[0-9a-z]+$/i;
      if (!extensionRegex.test(name)) {
        toast.error("File must have an extension");
        setName(file.name);
        return;
      }
      const currentExtension = file.name.match(extensionRegex)?.[0] || "";
      const newExtension = name.match(extensionRegex)?.[0] || "";
      let language = file.language;
      if (newExtension !== currentExtension) {
        language = detectLanguage(newExtension);
        if (language === "Unknown") {
          toast.error("Language is not supported");
          setName(file.name);
          return;
        }
      }
      const parent = findParentFolder(asset.rootFolder, file.id);
      if (parent) {
        const isDuplicate = parent.items.some(
          (f) => f.id !== file.id && f.name.toLowerCase() === name.toLowerCase()
        );

        if (isDuplicate) {
          toast.error("A file or folder with such name already exists");
          setName(file.name);
          return;
        }
      }
      renameFile({
        id: file.id,
        text: file.text,
        language,
        name,
        parentId: parent.id,
      });
    }
    setEditingFileId(null);
  };

  const handleDelete = () => {
    deleteFile({ id: file.id });
  };

  const handlePrimaryCodeFile = () => {
    makePrimaryCodeFile({
      id: asset.id,
      description: asset.description,
      name: asset.name,
      tagsIds: asset.tags.map((tag) => tag.id),
      assetType: asset.assetType,
      language: file.language,
      rootFolderId: asset.rootFolder.id,
      primaryCodeFileId: file.id,
    });
  };

  return (
    <StyledFile
      onClick={(e) => {
        setActiveFile(file);
      }}
      isActive={activeFile?.id === file.id}
    >
      <Name
        ref={editingFileId === file.id ? nameInputRef : null}
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleRename}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleRename();
            e.target.blur();
          }
        }}
        isDisabled={editingFileId !== file.id || isDeleting || isChangingFile}
      />
      {!readOnly && (
        <Operations isActive={activeFile?.name === file.name}>
          {file.id === asset.primaryCodeFile.id ? (
            <Star />
          ) : (
            <HiOutlineStar
              onClick={(e) => {
                e.stopPropagation();
                handlePrimaryCodeFile();
              }}
            />
          )}
          <DropdownMenu.Root>
            <StyledToggle>
              <HiOutlineEllipsisVertical />
            </StyledToggle>

            <StyledContent>
              <StyledItem onClick={() => setEditingFileId(file.id)}>
                <HiOutlinePencilSquare /> Rename
              </StyledItem>
              {file.id !== asset.primaryCodeFile.id && (
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
    </StyledFile>
  );
}

export default File;
