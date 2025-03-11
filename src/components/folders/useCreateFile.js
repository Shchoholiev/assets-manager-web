import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createNewFile as createFileApi } from "../../services/apiFiles";

function addFileToFolder(folder, parentId, newFile) {
  if (folder.id === parentId) {
    console.log("folder found")
    return {
      ...folder,
      items: [...(folder.items || []), newFile], 
    };
  }

  if (!folder.items) return folder;

  return {
    ...folder,
    items: folder.items.map((item) =>
      item.type === 0 ? addFileToFolder(item, parentId, newFile) : item
    ),
  };
}


export function useCreateFile() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: createFile, isPending } = useMutation({
    mutationFn: createFileApi,
    onSuccess: (newFile) => {
      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;

        const updatedRootFolder = addFileToFolder(
          oldAsset.rootFolder,
          newFile.parentId,
          newFile
        );

        return {
          ...oldAsset,
          rootFolder: updatedRootFolder,
        };
      });
    },
  });

  return { createFile, isPending };
}
