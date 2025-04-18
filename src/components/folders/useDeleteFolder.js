import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { deleteFolder as deleteFolderApi } from "../../services/apiFolders";
import toast from "react-hot-toast";
import { deleteProjectFolder } from "../../services/apiProjects";

function removeFolderById(folder, folderId) {
  if (folder.id === folderId) return null;

  if (folder.items) {
    return {
      ...folder,
      items: folder.items
        .map((item) => removeFolderById(item, folderId))
        .filter(Boolean),
    };
  }

  return folder;
}

export function useDeleteFolder() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();
  const isProject = location.pathname.startsWith("/project");

  const { mutate: deleteFolder, isPending } = useMutation({
    mutationFn: (folderData) =>
      isProject
        ? deleteProjectFolder({ projectId: id, ...folderData })
        : deleteFolderApi(folderData),
    onSuccess: (deletedFolder) => {
      toast.success("Folder deleted successfully");

      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;
        return {
          ...oldAsset,
          rootFolder: removeFolderById(oldAsset.rootFolder, deletedFolder.id),
        };
      });
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong. Try again later");
    },
  });
  return { deleteFolder, isPending };
}
