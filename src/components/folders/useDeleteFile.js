import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { deleteFile as deleteFileApi } from "../../services/apiFiles";
import toast from "react-hot-toast";
function removeFileById(folder, fileId) {
  return {
    ...folder,
    items: folder.items
      .filter((item) => item.id !== fileId)
      .map((item) =>
        item.type === "folder" ? removeFileById(item, fileId) : item
      ),
  };
}

export function useDeleteFile() {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: deleteFile, isPending } = useMutation({
    mutationFn: deleteFileApi,
    onSuccess: (deletedFile) => {
      toast.success("File deleted successfully");
      queryClient.setQueryData(["asset", id], (oldAsset) => {
        if (!oldAsset) return oldAsset;
        return {
          ...oldAsset,
          rootFolder: removeFileById(oldAsset.rootFolder, deletedFile.id),
        };
      });
    },
    onError: (err) => {
      toast.error(err?.message || "Something went wrong. Try again later");
    },
  });
  return { deleteFile, isPending };
}
