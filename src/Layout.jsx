import React from "react";
import { AppBar, Toolbar, Typography, CssBaseline, Box } from "@mui/material";
import PromptSyntheticDataGenerator from "./components/PromptSyntheticDataGenerator/PromptSyntheticDataGenerator";

export default function Layout() {
    return (
        <Box>
            <CssBaseline />

            {/* App Bar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">My MUI Page</Typography>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <PromptSyntheticDataGenerator />
        </Box>
    );
}
