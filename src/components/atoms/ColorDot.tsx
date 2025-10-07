import { Box } from "@mui/material";

export default function ColorDot({ hex, size = 14 }: { hex: string; size?: number }) {
    return (
        <Box
            sx={{
                width: size,
                height: size,
                borderRadius: "50%",
                bgcolor: `#${hex}`,
                border: "1px solid rgba(0,0,0,0.12)",
            }}
        />
    );
}
