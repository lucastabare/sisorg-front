import { Box } from "@mui/material";

export default function ColorDot({ hex }: { hex: string }) {
    return (
        <Box
            sx={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                bgcolor: `#${hex}`,
                border: "1px solid rgba(0,0,0,0.1)",
            }}
        />
    );
}
