import { Snackbar, Alert } from "@mui/material";

type Props = { open: boolean; text: string; onClose: () => void };
export default function ErrorSnackbar({ open, text, onClose }: Props) {
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
            <Alert severity="error" variant="filled" onClose={onClose}>
                {text}
            </Alert>
        </Snackbar>
    );
}
