import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const getTabs = (columns = {}, currentValue) => {
  const tabHeaders = [];
  const tabPanels = [];
  var i=0;
  for(const [key, value] of Object.entries(columns)){
    console.log(key)
    console.log(value);
    tabHeaders.push(<Tab label={key} {...a11yProps(i)} />)
    tabPanels.push(<CustomTabPanel value={currentValue} index={i}>
      {value.insight}
    </CustomTabPanel>);
    i++;
  }
  return {
    tabHeaders,
    tabPanels,
  };
}

const ColumnData = (props) => {
  const [value, setValue] = React.useState(0);
  const {
    columns,
  } = props;
  const {
    tabHeaders,
    tabPanels,
  } = getTabs(columns, value);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {tabHeaders}
        </Tabs>
      </Box>
      {tabPanels}
    </Box>
  );
}
export default ColumnData;