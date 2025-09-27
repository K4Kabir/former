"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2, Pencil } from "lucide-react";
import { Card } from "./ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Step {
    id: number;
    label: string;
    fields: any[]; // Will be properly typed later
}

interface MultiSelectStepsProps {
    steps: Step[];
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
    activeStep: number | null;
    setActiveStep: React.Dispatch<React.SetStateAction<number | null>>;
}

const MultiSelectSteps: React.FC<MultiSelectStepsProps> = ({ steps, setSteps, activeStep, setActiveStep }) => {
    const [editingStepId, setEditingStepId] = useState<number | null>(null);

    const addStep = () => {
        const newStep = { id: Date.now(), label: `Step ${steps.length + 1}`, fields: [] };
        setSteps([...steps, newStep]);
        setActiveStep(newStep.id);
        setEditingStepId(newStep.id); // Automatically enter edit mode for new steps
    };

    const deleteStep = (id: number) => {
        setSteps(steps.filter((step) => step.id !== id));
    };

    const handleLabelChange = (id: number, newLabel: string) => {
        setSteps(
            steps.map((step) => (step.id === id ? { ...step, label: newLabel } : step))
        );
    };

    return (
        <Card className="flex flex-col gap-4 py-5 px-3 mt-4">
            <p className="text-2xl font-semibold">Multi-select Steps</p>
            {steps.map((step) => (
                <div key={step.id} className="flex items-center gap-2">
                    <div
                        className={cn(
                            "flex-grow cursor-pointer rounded-md border p-2 transition-colors",
                            activeStep === step.id
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-accent/50"
                        )}
                        onClick={() => {
                            setActiveStep(step.id);
                            setEditingStepId(null); // Exit edit mode when selecting a step
                        }}
                    >
                        {editingStepId === step.id ? (
                            <Input
                                value={step.label}
                                onChange={(e) => handleLabelChange(step.id, e.target.value)}
                                onBlur={() => setEditingStepId(null)}
                                autoFocus
                                className="border-none bg-transparent focus:ring-0"
                            />
                        ) : (
                            <span className="p-2">{step.label}</span>
                        )}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setEditingStepId(step.id)}>
                        <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => deleteStep(step.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
            <Button onClick={addStep}>Add Step</Button>
        </Card>
    );
};

export default MultiSelectSteps;
