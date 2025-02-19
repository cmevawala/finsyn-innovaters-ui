import { useState } from "react";
import FileUpload from "../fileupload/FileUpload"
import { styled } from '@mui/material/styles';
import { Alert, CircularProgress, Container } from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import ColumnData from "../columndata/ColumnData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const getColumnData = (columns) => {
  return (
    <Grid size={8}>
      <Item>
        <ColumnData
          columns={columns}
        />
      </Item>
    </Grid>
  );
}

const StructuredSyntheticDataGenerator = () => {
  const [structuredData, updatestructuredData] = useState(undefined);
  const fetchData = async () => {
    const data = await fetch("http://localhost:3000/response_get_structured_data_insights");
    const jsonResp = await data.json();
    const { structured_data_insights } = jsonResp;
    updatestructuredData(structured_data_insights);
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
  console.log(structuredData);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Item>
            <Alert severity="info">Please Upload a CSV file to generate structured synthetic data.</Alert>
          </Item>
        </Grid>
        <Grid size={8}>
          <Item>
            <FileUpload {...fileUploadProp} />
          </Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {
          structuredData && structuredData.columns && (
            <Item>{getColumnData(structuredData.columns)}
            </Item>
          )
        }
      </Grid>
    </Container>
  );

}

export default StructuredSyntheticDataGenerator;