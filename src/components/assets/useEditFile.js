import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editFile as editFileApi } from "../../services/apiFiles";
import { useParams } from "react-router-dom";

export function useEditFile() {
  const queryClient = useQueryClient();
  const {id} = useParams()
  const { mutate: editFile, isPending } = useMutation({
    mutationFn: editFileApi,
    onSuccess: (updatedFile) => {
      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;

        const updatedAsset = updateFileInAsset(oldAsset.rootFolder, updatedFile);
        return { ...oldAsset, rootFolder: updatedAsset };
      });
    },
  });
  return { editFile, isPending };
}

function updateFileInAsset(folder, updatedFile) {
    if (!folder || !folder.items) return folder; 
  
    return {
      ...folder,
      items: folder.items.map((item) => {
        if (item.id === updatedFile.id) {
          return { ...item, ...updatedFile }; 
        } else if (item.type === 0) {
          return { ...item, items: updateFileInAsset(item, updatedFile).items };
        }
        return item;
      }),
    };
  }
  
  