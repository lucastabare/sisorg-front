import { Box } from "@mui/material";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import ColorDot from "../atoms/ColorDot";
import type { RowViewModel } from "../../types/registry";

type Props = { rows: RowViewModel[] };

export default function RowList({ rows }: Props) {
    const cols: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1, minWidth: 160 },
        { field: "value", headerName: "Value", width: 120, type: "number" },
        {
            field: "color",
            headerName: "Color",
            width: 140,
            renderCell: (params: GridRenderCellParams) => {
                const hex = String(params.value ?? "").toUpperCase();
                return (
                    <Box display="flex" alignItems="center" gap={1}>
                        <ColorDot hex={hex} />
                        #{hex}
                    </Box>
                );
            },
        },
    ];

    const rowsData = rows.map((r, i) => ({ id: i, ...r }));

    return (
        <Box sx={{ height: 360 }}>
            <DataGrid
                rows={rowsData}
                columns={cols}
                density="compact"
                disableRowSelectionOnClick
                hideFooterSelectedRowCount
            />
        </Box>
    );
}
