import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { editFile as editFileApi } from "../../services/apiFiles";
import { useActiveFile } from "../../context/ActiveFileContext";
import toast from "react-hot-toast";
import { useAsset } from "../assets/useAsset";

function updateFileInAsset(folder, updatedFile) {
  if (!folder) return folder;

  return {
    ...folder,
    items: folder.items.map((item) => {
      if (item.id === updatedFile.id) {
        return {
          ...item,
          name: updatedFile.name,
          language: updatedFile.language,
        };
      }
      if (item.type === 0) {
        return updateFileInAsset(item, updatedFile);
      }
      return item;
    }),
  };
}
export function useRenameFile() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { activeFile, setActiveFile } = useActiveFile();

  const { mutate: renameFile, isPending } = useMutation({
    mutationFn: editFileApi,
    onSuccess: (updatedFile) => {
      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;
        const updatedRootFolder = updateFileInAsset(
          oldAsset.rootFolder,
          updatedFile
        );
        let newAsset = { ...oldAsset, rootFolder: updatedRootFolder };
        if (updatedFile.id === oldAsset.primaryCodeFile.id) {
          newAsset = {
            ...newAsset,
            language: updatedFile.language, 
            primaryCodeFile: {
              ...newAsset.primaryCodeFile,
              language: updatedFile.language,
              name: updatedFile.name, 
              text: updatedFile.text,
            },
          };
        }
        return newAsset;
      });
      if (activeFile?.id === updatedFile.id) {
        setActiveFile((prev) => ({ ...prev, name: updatedFile.name }));
      }
      
    },
    onError: () => {
      toast.error("Something went wrong! Try again later");
    },
  });
  return { renameFile, isPending };
}
