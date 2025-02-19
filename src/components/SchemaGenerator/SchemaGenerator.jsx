import React, { useEffect, useState } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Container, Typography, Box, IconButton } from "@mui/material";
import { useStateContext } from "../PromptSyntheticDataGenerator/StateContext";
import DeleteIcon from "@mui/icons-material/Delete";


export default function DynamicForm() {
  // const [formData, setFormData] = useState(
  //   Object.fromEntries(schema.fields.map(field => [field.name, field.default || ""]))
  // );

  const { state, dispatch } = useStateContext();
  const { schema = {}, showReport } = state;

  const [fields, setFields] = useState(schema);
  const [formData, setFormData] = useState(
    Object.fromEntries(fields.map(field => [field.name, field.default || ""]))
  );

  useEffect(() => {
    setFields(schema)
  }, [schema])

  console.log(schema);
  console.log(fields);
  // console.log(formData);
  // console.log(transformedSchema);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddField = () => {
    const newField = {
      name: `newField_${fields.length + 1}`,
      label: ``,
      type: "string",
    };
    setFields([...fields, newField]);
    setFormData(prevData => ({ ...prevData, [newField.name]: "" }));
  };

  const handleRemoveField = (name) => {
    setFields(prevFields => prevFields.filter(field => field.name !== name));
    setFormData(prevData => {
      const newData = { ...prevData };
      delete newData[name];
      return newData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleGenerateSyntheticData = (event) => {
    event.preventDefault();
    dispatch({ type: "SHOW_REPORT", payload: true });
  }


  if (schema.length === 0) return null

  if (showReport) return null;

  return (
    <Box sx={{
      p: 2,  // Padding of 2 units (16px)
      borderRadius: 2 // Rounded corners
    }}>

      <Typography variant="h5" gutterBottom>
        Schema Validation
      </Typography>

      <form onSubmit={handleSubmit}>

        {fields.map(field => (

          <Box key={field.name} display="flex" alignItems="center" mb={2}>

            <FormControl fullWidth key={field.name} margin="normal">
              {field.type === "string" || field.type === "number" ? (
                <TextField
                  type={field.type}
                  label={field.label}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  required={field.required}
                />
              ) : field.type === "select" ? (
                <>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                  >
                    {field.options.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </>
              ) : field.type === "checkbox" ? (
                <FormControlLabel
                  control={<Checkbox checked={formData[field.name]} onChange={(e) => handleChange(field.name, e.target.checked)} />}
                  label={field.label}
                />
              ) : null}
            </FormControl>

            <IconButton onClick={() => handleRemoveField(field.name)} color="error" sx={{ ml: 1 }}>
              <DeleteIcon />
            </IconButton>
          </Box>

        ))}

        <Button type="button" color="secondary" sx={{ mt: 2, mr: 2 }}
          onClick={handleAddField}>
          Add Field
        </Button>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}
          onClick={handleGenerateSyntheticData}>
          Generate Synthetic Data
        </Button>


      </form>
    </Box>
  );
}
