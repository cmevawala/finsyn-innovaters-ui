import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    transform: 'rotate(90deg)',
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



const StatsAccordion = (props) => {
  const { data } = props;
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const getStats = (data) => {
    const statsRows = [];
    const stats = [];
    for (const [key, value] of Object.entries(data)) {
      statsRows.push(
        <TableRow key={key}>
          <TableCell component="th" scope="row">{key}</TableCell>
          <TableCell component="th" scope="row">{value}</TableCell>
        </TableRow>
      )
    }
    stats.push(
      <TableContainer component={Paper}>
        <TableBody>
          {statsRows}
        </TableBody>
      </TableContainer>
    );
    return stats;

  }

  const getAccordion = (data) => {
    const accordionData = [];
    for (const [key, value] of Object.entries(data)) {
      accordionData.push(
        <Accordion key={key} expanded={expanded === key} onChange={handleChange(key)}>
          <AccordionSummary aria-controls={key + "-content"} id={key + "-header"}>
            <Typography component="span">{key}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {getStats(value)}
          </AccordionDetails>
        </Accordion>
      );
    }
    return accordionData;
  }

  return (<>
    {getAccordion(data)}
  </>
  );
}


export default StatsAccordion;