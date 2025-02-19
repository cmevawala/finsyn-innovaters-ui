
import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";

function PromptSyntheticDataGenerator() {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");

    useEffect(() => {
        // fetch("http://localhost:5000/response_get_schema_from_users_prompt")
        //     .then(response => response.json())
        //     .then(data => console.log(data));
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await fetch("http://localhost:5000/response_get_schema_from_users_prompt", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            //   body: JSON.stringify({ prompt: text }),
            });
            const data = await res.json();
            setResponse(data);
          } catch (error) {
            console.error("Error calling API:", error);
            setResponse("Error fetching data");
          }
    }

    return (
        <Container sx={{ mt: 4 }}>

            {/* Text Area */}
            <TextField
                fullWidth
                multiline
                rows={2}
                variant="outlined"
                label="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                inputProps={{ maxLength: 1000 }}
                sx={{ mt: 2 }}
            />

            {/* Button */}
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Container>
    );
}

export default PromptSyntheticDataGenerator;
