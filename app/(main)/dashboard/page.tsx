'use client'
import React, { useState } from "react";
import Builder from "@/components/Builder";
import { BuilderDataInterface } from "@/types/BuilderInterface";
import MultiSelectSteps from "@/components/MultiSelectSteps";

interface Step {
  id: number;
  label: string;
  fields: any[];
}

const page = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [builderData, setBuilderData] = useState<BuilderDataInterface>({
    title: "",
    description: "",
    type: "",
    isMultiSelect: false,
  });

  return (
    <div>
      <Builder builderData={builderData} setBuilderData={setBuilderData} />
      {builderData.isMultiSelect && (
        <MultiSelectSteps
          steps={steps}
          setSteps={setSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}
    </div>
  );
};

export default page;
