import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";

export default function MainLayout() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={RouterLink} to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Sisorg
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
}
