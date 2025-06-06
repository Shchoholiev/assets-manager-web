import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { deleteFile as deleteFileApi } from "../../services/apiFiles";
import toast from "react-hot-toast";
import { deleteProjectFile } from "../../services/apiProjects";

function removeFileById(folder, parentId, fileId) {
  if (folder.id === parentId) {
    return {
      ...folder,
      items: folder.items.filter((item) => item.id !== fileId),
    };
  }

  if (!folder.items) return folder;

  return {
    ...folder,
    items: folder.items.map((item) => {
      if (item.type === 0) {
        return removeFileById(item, parentId, fileId);
      }
      return item;
    }),
  };
}

export function useDeleteFile() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();
  const isProject = location.pathname.startsWith("/project");

  const { mutate: deleteFile, isPending } = useMutation({
    mutationFn: (fileData) =>
      isProject
        ? deleteProjectFile({ projectId: id, ...fileData })
        : deleteFileApi(fileData),
    onSuccess: (deletedFile) => {
      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;
        const updatedRootFolder = removeFileById(
          oldAsset.rootFolder,
          deletedFile.parentId,
          deletedFile.id
        );

        return { ...oldAsset, rootFolder: updatedRootFolder };
      });

      toast.success("File deleted successfully");
    },

    onError: (err) => {
      toast.error(err?.message || "Something went wrong. Try again later");
    },
  });
  return { deleteFile, isPending };
}
