import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewFolder as createFolderApi } from "../../services/apiFolders";
import { useParams } from "react-router-dom";

function insertFolder(folder, newFolder) {
  if (folder.id === newFolder.parentId) {
    return { ...folder, items: [...folder.items, newFolder] };
  }

  return {
    ...folder,
    items: folder.items.map((item) =>
      item.type === 0 ? insertFolder(item, newFolder) : item
    ),
  };
}

export function useCreateFolder() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: createFolder, isPending } = useMutation({
    mutationFn: createFolderApi,
    onSuccess: (newFolder) => {
      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;

        const updatedRootFolder = insertFolder(oldAsset.rootFolder, newFolder);

        return { ...oldAsset, rootFolder: updatedRootFolder };
      });
    },
  });

  return { createFolder, isPending };
}
