import type { PropsWithChildren } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const qc = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
