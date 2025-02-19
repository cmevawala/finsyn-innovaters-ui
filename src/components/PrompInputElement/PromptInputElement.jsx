
import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Box } from "@mui/material";
import Loader from "../Loader";
import { useStateContext } from "../PromptSyntheticDataGenerator/StateContext";

function PromptInputElement() {
    const { state, dispatch } = useStateContext();
    const { schema = {} } = state;

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     // fetch("http://localhost:5000/response_get_schema_from_users_prompt")
    //     //     .then(response => response.json())
    //     //     .then(data => console.log(data));
    // }, []); 

    const fetchSchema = async () => {
        try {
            const res = await fetch("http://localhost:5000/response_get_schema_from_users_prompt", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                //   body: JSON.stringify({ prompt: text }),
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error calling API:", error);
            return null;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const schema = await fetchSchema();
        if (schema) {
            dispatch({ type: "SCHEMA_RECEIVED", payload: schema });
        }
        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    if (schema !== "") return <></>

    return (
        <Box sx={{
            color: 'white',
            p: 2,  // Padding of 2 units (16px)
            borderRadius: 2 // Rounded corners
        }}>
            {/* Text Area */}
            <TextField
                multiline
                rows={3}
                variant="outlined"
                label="Enter Prompt"
                value={text}
                onChange={(e) => setText(e.target.value)}
                inputProps={{ maxLength: 3000 }}
                sx={{ width: "100%" }}
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
        </Box>
        // <Container sx={{ mt: 4 }} >

        //     {/* Text Area */}
        //     <TextField
        //         multiline
        //         rows={2}
        //         variant="outlined"
        //         label="Enter text"
        //         value={text}
        //         onChange={(e) => setText(e.target.value)}
        //         inputProps={{ maxLength: 1000 }}
        //         sx={{ width: "100%" }} 
        //     />

        //     {/* Button */}
        //     <Button
        //         variant="contained"
        //         color="primary"
        //         sx={{ mt: 2 }}
        //         onClick={handleSubmit}
        //     >
        //         Submit
        //     </Button>
        // </Container>
    );
}

export default PromptInputElement;
