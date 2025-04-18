import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { editFolder as editFolderApi } from "../../services/apiFolders";
import { editProjectFolder as editProjectFolderApi } from "../../services/apiProjects";

function updateFolderName(folder, updatedFolder) {
  if (folder.id === updatedFolder.id) {
    return { ...folder, name: updatedFolder.name };
  }
  if (folder.items) {
    return {
      ...folder,
      items: folder.items.map((item) => updateFolderName(item, updatedFolder)), // ✅ Pass updatedFolder
    };
  }
  return folder;
}

export function useRenameFolder() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();
  const isProject = location.pathname.startsWith("/project");
  const { mutate: renameFolder, isPending } = useMutation({
    mutationFn: (folderData) =>
      isProject
        ? editProjectFolderApi({ projectId: id, ...folderData })
        : editFolderApi(folderData),
    onSuccess: (updatedFolder) => {
      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;
        return {
          ...oldAsset,
          rootFolder: updateFolderName(oldAsset.rootFolder, updatedFolder),
        };
      });
    },
  });
  return { renameFolder, isPending };
}
