import { Card, CardContent, CardHeader, Stack, Button } from "@mui/material";
import UploadField from "../molecules/UploadField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUploadRegistry } from "../../hooks/useRegistries";
import ErrorSnackbar from "../atoms/ErrorSnackbar";
import type { ApiError } from "../../types/error";

export default function UploadCard() {
  const [error, setError] = useState<string>("");
  const [progress, setProgress] = useState<number | null>(null);
  const navigate = useNavigate();
  const upload = useUploadRegistry();

  const handlePick = (file: File) => {
    setProgress(0);
    upload.mutate(
      { file, onProgress: setProgress },
      {
        onSuccess: (data) => navigate(`/registry/${data.id}`),
        onError: (e) => {
          const err = e as unknown as ApiError;
          setError(err?.message ?? "Unexpected error");
          setProgress(null);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader title="Cargar registros (TXT)" subheader={`Formato: "Name#Value#Color"`} />
      <CardContent>
        <Stack spacing={2}>
          <UploadField onPick={handlePick} progress={progress} />
        </Stack>
      </CardContent>

      <ErrorSnackbar open={!!error} text={error} onClose={() => setError("")} />
    </Card>
  );
}
