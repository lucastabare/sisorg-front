import { Card, CardHeader, CardContent, Stack, Typography, Button } from "@mui/material";
import RowList from "../molecules/RowList";
import { useDeleteRegistry } from "../../hooks/useRegistries";
import { useNavigate } from "react-router-dom";
import type { DataViewModel } from "../../types/registry";

export default function RegistrySummary({ data }: { data: DataViewModel }) {
    const deleteMutation = useDeleteRegistry();
    const navigate = useNavigate();

    return (
        <Card>
            <CardHeader
                title={`Registro #${data.id}`}
                subheader={`Filas: ${data.count} · ${new Date(data.timestamp).toLocaleString()}`}
            />
            <CardContent>
                <Stack spacing={2}>
                    <RowList rows={data.rows} />
                    <Stack direction="row" gap={2}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() =>
                                deleteMutation.mutate(data.id, { onSuccess: () => navigate("/") })
                            }
                        >
                            Eliminar
                        </Button>
                        <Button variant="contained" onClick={() => navigate("/")}>
                            Volver
                        </Button>
                    </Stack>
                    {deleteMutation.isError && (
                        <Typography color="error">No se pudo eliminar.</Typography>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
