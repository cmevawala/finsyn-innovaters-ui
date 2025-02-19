import React from "react";
import { Container } from "@mui/material";
import { StateProvider } from "./StateContext";
import PromptInputElement from "../PrompInputElement/PromptInputElement";
import DynamicFormGenerator from "../DynamicFormGenerator/DynamicFormGenerator"

function PromptSyntheticDataGenerator() {

    return (
        <StateProvider>
            <Container sx={{ mt: 4 }}>
                <h2>Generate Metadata</h2>
            </Container>
            <PromptInputElement />
            <DynamicFormGenerator />
        </StateProvider>
    );

}

export default PromptSyntheticDataGenerator;
