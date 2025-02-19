import { useState } from "react";
import FileUpload from "../fileupload/FileUpload"
import {
  Alert,
  Button,
  Box,
  Container,
  Modal,
  Typography,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid2';
import jsonToCsvExport from "json-to-csv-export";
import { GET_SYNTHETIC_STRUCTURED_DATA, RESPONSE_GET_STRUCTURED_DATA_INSIGHTS } from "../../constants/urls";
import StructuredDataAnalysis from "./StructuredDataAnalysis";
import Item from "./Griditem";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  height: '80%',
};

const StructuredSyntheticDataGenerator = () => {
  const [structuredData, updatestructuredData] = useState(undefined);
  const [syntheticStructuredData, updateSyntheticStructuredData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = async () => {
    const data = await fetch(RESPONSE_GET_STRUCTURED_DATA_INSIGHTS);
    const jsonResp = await data.json();
    const { structured_data_insights } = jsonResp;
    updatestructuredData(structured_data_insights);
  }
  const reset = () => {
    updatestructuredData(undefined);
  }
  const generateSyntheticData = async () => {
    const syntheticData = await fetch(GET_SYNTHETIC_STRUCTURED_DATA);
    const structuredSyntheticData = await syntheticData.json();
    updateSyntheticStructuredData(structuredSyntheticData);
    handleOpen();
  }
  const fileUploadProp = {
    accept: '*/*',
    onChange: (event) => {
      if (
        event.target.files !== null &&
        event.target?.files?.length > 0
      ) {
        console.log(`Saving ${event.target.value}`)
        fetchData();
      }
    },
    onDrop: (event) => {
      console.log(`Drop ${event.dataTransfer.files[0].name}`)
    },
  }
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Item>
            <Alert severity="info">Please Upload a CSV file to generate structured synthetic data.</Alert>
          </Item>
        </Grid>
        <Grid size={12}>
          <Item>
            <FileUpload {...fileUploadProp} />
          </Item>
        </Grid>
      </Grid>
      <StructuredDataAnalysis structuredData={structuredData} />
      {structuredData && (
        <>
          <Grid marginTop={'10px'} container spacing={2}>
            <Grid size={6}>
              <Item>
                <Button onClick={() => reset()} variant="outlined" startIcon={<DeleteIcon />}>
                  Reset
                </Button>
              </Item>
            </Grid>
            <Grid size={6}>
              <Item>
                <Button onClick={() => generateSyntheticData()} variant="contained" endIcon={<SendIcon />}>
                  Generate Synthetic data
                </Button>
              </Item>
            </Grid>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
                Synthetic Data Generated
              </Typography>
              <StructuredDataAnalysis structuredData={syntheticStructuredData.structured_data_insights} />
              <Grid marginTop={'10px'} container spacing={2}>
            <Grid size={12}>
              <Item>
                <Button onClick={() => jsonToCsvExport({data: syntheticStructuredData.synthetic_data})} variant="outlined" startIcon={<Download />}>
                  Download Synthetic Data
                </Button>
              </Item>
            </Grid>
          </Grid>
            </Box>
          </Modal>
        </>
      )}

    </Container>
  );
}

export default StructuredSyntheticDataGenerator;