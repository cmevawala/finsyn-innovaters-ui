import React from "react";
import { Container } from "@mui/material";
import { StateProvider } from "./StateContext";
import PromptInputElement from "../PrompInputElement/PromptInputElement";
import DynamicFormGenerator from "../SchemaGenerator/SchemaGenerator"
import PromptSyntheticDataReport from "../PromptSyntheticDataReport/PromptSyntheticDataReport";

function PromptSyntheticDataGenerator() {

    return (
        <StateProvider>
            <PromptInputElement />
            <DynamicFormGenerator />
            <PromptSyntheticDataReport />
        </StateProvider>
    );

}

export default PromptSyntheticDataGenerator;
