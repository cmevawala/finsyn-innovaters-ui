import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Typography } from "@mui/material";
import { useStateContext } from "../PromptSyntheticDataGenerator/StateContext";


const PromptSyntheticDataReport = () => {

    const { state } = useStateContext();
    const { syntheticData = {}, showReport } = state;


    if (syntheticData.length === 0) {
        return <Typography>No data available</Typography>;
    }

    // Generate columns dynamically
    const columns = Object.keys(syntheticData[0]).map((key) => ({
        field: key,
        headerName: key.replace(/_/g, " ").toUpperCase(),
        flex: 1,
    }));

    // Add unique `id` field for DataGrid
    const rows = syntheticData.map((row, index) => ({ id: index + 1, ...row }));

    const handleDriftReport = () => {

    }

    if (!showReport) return null;

    return (
        <Container sx={{ height: 400, width: "100%", mt: 2, mb: 2, height: "100%" }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
                Synthetic Data Report
            </Typography>
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection
                sx={{ mb: 2 }} />

            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
                onClick={handleDriftReport}
            >
                Download Drift Report
            </Button>

            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, mr: 2 }}
                onClick={handleDriftReport}
            >
                Download CSV
            </Button>
        </Container>
    );
};

export default PromptSyntheticDataReport;