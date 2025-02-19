import React, { useState } from "react";
import { CircularProgress, Box } from "@mui/material";

function Loader() {
    return (
        <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
        </Box>
    );
}

export default Loader;
