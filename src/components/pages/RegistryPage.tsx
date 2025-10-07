import { useParams, useNavigate } from "react-router-dom";
import { useRegistry, useDeleteRegistry } from "../../hooks/useRegistries";
import { Box, Card, CardContent, CardHeader, Stack, Button, Typography } from "@mui/material";
import RowList from "../molecules/RowList";
import RowsBarChart from "../organisms/RowsBarChart";
import ErrorSnackbar from "../atoms/ErrorSnackbar";
import { useState } from "react";

export default function RegistryPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const params = Number(id);
    const query = useRegistry(params);
    const deleteSync = useDeleteRegistry();
    const [errorSync, setErrorSync] = useState("");

    const handleDelete = async () => {
        try {
            await deleteSync.mutateAsync(params);
            navigate("/");
        } catch (e: any) {
            setErrorSync(e?.message ?? "Error al borrar");
        }
    };

    if (!id || Number.isNaN(params) || params <= 0) {
        return (
            <Stack spacing={2}>
                <Typography>ID inválido.</Typography>
                <Button variant="outlined" onClick={() => navigate("/")}>Volver</Button>
            </Stack>
        );
    }

    if (query.isLoading) return <Box>cargando...</Box>;
    if (query.isError) return <Box>error</Box>;
    if (!query.data) return <Box>no data</Box>;

    return (
        <Stack spacing={2}>
            <Card>
                <CardHeader
                    title={`Registro #${query.data.id}`}
                    subheader={`${query.data.count} filas · ${new Date(query.data.timestamp).toLocaleString()}`}
                />
                <CardContent>
                    <RowList rows={query.data.rows} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader title="Gráfico de barras" />
                <CardContent>
                    <RowsBarChart rows={query.data.rows} />
                </CardContent>
            </Card>

            <Box display="flex" gap={1}>
                <Button variant="outlined" onClick={() => navigate("/")}>Volver</Button>
                <Button color="error" variant="contained" onClick={handleDelete} disabled={deleteSync.isPending}>
                    Borrar registro
                </Button>
            </Box>

            <ErrorSnackbar open={!!errorSync} text={errorSync} onClose={() => setErrorSync("")} />
        </Stack>
    );
}