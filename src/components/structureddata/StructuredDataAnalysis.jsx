import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Item from './Griditem';
import ColumnData from '../columndata/ColumnData';
import StatsAccordion from '../statsdata/StatsAccordion';

const getColumnData = (columns) => {
  return (
    <Item>
      <Typography variant="h4" gutterBottom>
        Insights
      </Typography>
      <ColumnData
        columns={columns}
      />
    </Item>
  );
}

const getStatistics = (stats) => {
  return (
    <Item>
      <Typography variant="h4" gutterBottom>
        Statistics Summary
      </Typography>
      <StatsAccordion data={stats} />
    </Item>
  );
}
const StructuredDataAnalysis = (props) => {
  const { structuredData } = props;
  return (<>
    <Grid container spacing={2}>
      <Grid size={12}>
        {
          structuredData && structuredData.columns && (
            <Item>{getColumnData(structuredData.columns)}
            </Item>
          )
        }
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid size={12}>
        {
          structuredData && structuredData.summary_statistics && (
            <Item>{getStatistics(structuredData.summary_statistics)}
            </Item>
          )
        }
      </Grid>
    </Grid>
  </>
  );
}

export default StructuredDataAnalysis;