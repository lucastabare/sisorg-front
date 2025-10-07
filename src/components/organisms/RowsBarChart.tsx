import { Box } from "@mui/material";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
} from "recharts";
import type { RowViewModel } from "../../types/registry";

type Props = { rows: RowViewModel[] };

export default function RowsBarChart({ rows }: Props) {
    const data = rows.map(r => ({
        name: r.name,
        value: r.value,
        fill: `#${r.color}`,
    }));

    return (
        <Box sx={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" isAnimationActive>
                        {data.map((d, i) => (
                            <Cell key={i} fill={d.fill} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}
