import React, { useState } from "react";
import { TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Container, Typography, Box } from "@mui/material";
import { useStateContext } from "../PromptSyntheticDataGenerator/StateContext";

function transformObjectToArray(obj) {
  return Object.entries(obj).map(([key, value]) => {
    let formattedName = key.replace(/([a-z])([A-Z])/g, '$1 $2'); // Insert space before capital letters
    formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1); // Capitalize first letter

    return {
      name: key,
      label: formattedName,
      ...value
    };
  });
}

export default function DynamicForm() {
  // const [formData, setFormData] = useState(
  //   Object.fromEntries(schema.fields.map(field => [field.name, field.default || ""]))
  // );

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const { state } = useStateContext();
  const { schema = {} } = state;

  const transformedSchema = transformObjectToArray(schema);

  const [formData, setFormData] = useState(transformedSchema);

  console.log(schema);
  // console.log(formData);
  // console.log(transformedSchema);

  if (schema === "") return null

  return (
    <Box sx={{
      color: 'white',
      p: 2,  // Padding of 2 units (16px)
      borderRadius: 2 // Rounded corners
    }}>
      <form onSubmit={handleSubmit}>
        {transformedSchema.map(field => (
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
        ))}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Generate Synthetic Data
        </Button>
      </form>
    </Box>
  );
}
