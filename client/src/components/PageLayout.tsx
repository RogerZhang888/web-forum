import { Box } from "@mui/material";

export default function PageLayout({ children }: { children: React.ReactNode}) {
    return (
        <Box
            sx={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
            }}
            >
            <Box
                sx={{
                width: "100%",
                maxWidth: 720,   // Reddit-like width
                px: 2,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}