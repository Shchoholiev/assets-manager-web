import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewFolder as createFolderApi } from "../../services/apiFolders";
import { useParams } from "react-router-dom";
import { createNewFile as createFileApi } from "../../services/apiFiles";

function addFileToFolder(folder, newFile) {
    if (folder.id === newFile.parentId) {
      return {
        ...folder,
        items: [...folder.items, newFile], 
      };
    }
  
    return {
      ...folder,
      items: folder.items.map((item) =>
        item.type === "folder" ? addFileToFolder(item, newFile) : item
      ),
    };
  }
  

export function useCreateFile() {
    const queryClient = useQueryClient();
    const { id } = useParams();
  
    const { mutate: createFile, isPending } = useMutation({
      mutationFn: createFileApi,
      onSuccess: (newFile) => {
        console.log(newFile);
  
        queryClient.setQueryData(["asset", id], (oldAsset) => {
          if (!oldAsset) return oldAsset;
  
          const updatedRootFolder = addFileToFolder(oldAsset.rootFolder, newFile);
  
          return {
            ...oldAsset,
            rootFolder: updatedRootFolder,
          };
        });
      },
    });
  
    return { createFile, isPending };
  }
  