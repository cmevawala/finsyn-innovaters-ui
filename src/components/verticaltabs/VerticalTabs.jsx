import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StructuredSyntheticDataGenerator from "../structureddata/StructuredSyntheticDataGenerator";
import PromptSyntheticDataGenerator from "../PromptSyntheticDataGenerator/PromptSyntheticDataGenerator";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ "width": "100%", "height": "100%" }}
      {...other}
    >
      {value === index && (
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", width: "150px" }}
      >
        <Tab
          label="Structured Data"
          {...a11yProps(0)}
        />
        <Tab label="Generate Data" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <StructuredSyntheticDataGenerator />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PromptSyntheticDataGenerator />
      </TabPanel>
    </Box>
  );
}
