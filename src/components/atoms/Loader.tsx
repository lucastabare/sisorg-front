import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
    return (
        <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress />
        </Box>
    );
}
