import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { useRegistry, useDeleteRegistry } from "../../hooks/useRegistries";

export default function RegistryActions() {
    const [id, setId] = useState<number>(0);
    const getQuery = useRegistry(id);
    const del = useDeleteRegistry();

    return (
        <Stack direction="row" gap={2} alignItems="center">
            <TextField
                label="Registry ID"
                type="number"
                size="small"
                value={id || ""}
                onChange={(e) => setId(Number(e.target.value))}
            />
            <Button
                variant="outlined"
                onClick={() => getQuery.refetch()}
                disabled={!id}
            >
                Get
            </Button>
            <Button
                color="error"
                variant="contained"
                onClick={() => del.mutate(id)}
                disabled={!id}
            >
                Delete
            </Button>
        </Stack>
    );
}
