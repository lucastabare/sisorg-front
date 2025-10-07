import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRegistry, getRegistry, uploadRegistry } from "../api/registries";
import type { DataViewModel } from "../types/registry";

export function useUploadRegistry() {
  return useMutation({
    mutationFn: ({ file, onProgress }: { file: File; onProgress?: (p: number) => void }) =>
      uploadRegistry(file, onProgress),
  });
}

export function useRegistry(id: number) {
  return useQuery<DataViewModel>({
    queryKey: ["registry", id],
    queryFn: () => getRegistry(id),
    enabled: !!id,
  });
}

export function useDeleteRegistry() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteRegistry(id),
    onSuccess: () => query.invalidateQueries({ queryKey: ["registry"] }),
  });
}
