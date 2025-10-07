import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import type { RowViewModel } from "../../types/registry";
import { Card, CardContent, Typography } from "@mui/material";

export default function BarChartPanel({ rows }: { rows: RowViewModel[] }) {
    const data = rows.map(r => ({ name: r.name, value: r.value, fill: `#${r.color}` }));
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" mb={2}>Bars</Typography>
                <div style={{ width: "100%", height: 320 }}>
                    <ResponsiveContainer>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
