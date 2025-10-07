import { useParams } from "react-router-dom";
import { Grid, Alert } from "@mui/material";
import Loader from "../atoms/Loader";
import RegistrySummary from "../organisms/RegistrySummary";
import { useRegistry } from "../../hooks/useRegistries";

export default function RegistryPage() {
    const { id } = useParams();
    const number = Number(id);
    const registry = useRegistry(number);

    if (registry.isLoading) return <Loader />;
    if (registry.isError) return <Alert severity="error">No se pudo cargar el registro.</Alert>;
    if (!registry.data) return <Alert severity="warning">Registro no encontrado.</Alert>;

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
                <RegistrySummary data={registry.data} />
            </Grid>
        </Grid>
    );
}
