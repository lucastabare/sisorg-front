import { api } from "./api";
import type { DataDto, DataViewModel } from "../types/registry";
import { mapDataDto } from "../types/registry";

export async function uploadRegistry(
  file: File,
  onProgress?: (p: number) => void
): Promise<DataViewModel> {
  const form = new FormData();
  form.append("file", file);

  const { data } = await api.post<DataDto>("/api/registries", form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (e) => {
      if (!onProgress || !e.total) return;
      onProgress(Math.round((e.loaded * 100) / e.total));
    },
  });

  return mapDataDto(data);
}

export async function getRegistry(id: number): Promise<DataViewModel> {
  const { data } = await api.get<DataDto>(`/api/registries/${id}`);
  return mapDataDto(data);
}

export async function deleteRegistry(id: number): Promise<void> {
  await api.delete(`/api/registries/${id}`);
}
