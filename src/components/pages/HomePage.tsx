import { Grid } from "@mui/material";
import UploadCard from "../organisms/UploadCard";

export default function HomePage() {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
                <UploadCard />
            </Grid>
        </Grid>
    );
}
