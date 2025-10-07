import { LinearProgress, Stack, Typography } from "@mui/material";
import FileInputButton from "../atoms/FileInputButton";

type Props = { onPick: (f: File) => void; progress?: number | null; };

export default function UploadField({ onPick, progress = null }: Props) {
    return (
        <Stack spacing={1}>
            <FileInputButton onPick={onPick} />
            {progress !== null && (
                <>
                    <Typography variant="caption">Subiendo... {progress}%</Typography>
                    <LinearProgress variant="determinate" value={progress} />
                </>
            )}
        </Stack>
    );
}
