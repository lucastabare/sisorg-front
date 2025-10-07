import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ColorDot from "../atoms/ColorDot";
import type { RowViewModel } from "../../types/registry";

type Props = { rows: RowViewModel[] };

type GridRow = RowViewModel & { id: number };

export default function RowList({ rows }: Props) {
  const cols: GridColDef<GridRow>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "value", headerName: "Value", width: 120, type: "number" },
    {
      field: "color",
      headerName: "Color",
      width: 140,
      renderCell: (params: GridRenderCellParams<GridRow, string>) => (
        <Box display="flex" alignItems="center" gap={1}>
          <ColorDot hex={params.value ?? ""} />
          #{params.value}
        </Box>
      ),
    },
  ];

  const rowsData: GridRow[] = rows.map((r, i) => ({ id: i, ...r }));

  return (
    <Box sx={{ height: 360 }}>
      <DataGrid rows={rowsData} columns={cols} density="compact" />
    </Box>
  );
}
