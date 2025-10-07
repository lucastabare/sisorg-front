import { Button } from "@mui/material";
import { useRef } from "react";
import type { ChangeEvent } from "react";
import UploadIcon from "@mui/icons-material/Upload";

type Props = { label?: string; onPick: (file: File) => void; accept?: string; };

export default function FileInputButton({ label = "Subir TXT", onPick, accept = ".txt" }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onPick(file);
        if (ref.current) ref.current.value = "";
    };

    return (
        <>
            <input ref={ref} type="file" accept={accept} hidden onChange={onChange} />
            <Button variant="contained" startIcon={<UploadIcon />} onClick={() => ref.current?.click()}>
                {label}
            </Button>
        </>
    );
}
