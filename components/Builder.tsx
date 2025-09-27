'use client'

import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";
import { Dispatch, SetStateAction } from "react";
import { BuilderDataInterface } from "@/types/BuilderInterface";

interface BuilderPropsInterface {
  builderData: BuilderDataInterface
  setBuilderData: Dispatch<SetStateAction<BuilderDataInterface>>;
}

const Builder = ({ builderData, setBuilderData }: BuilderPropsInterface) => {

  const handleChange = (field: string, value: string | boolean) => {
    setBuilderData((prev) => ({ ...prev, [field]: value }));
  };

  const selectOptions = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "textarea", label: "Textarea" },
    { value: "select", label: "Select" },
    { value: "radio-group", label: "Radio Group" },
    { value: "switch", label: "Switch" },
  ];

  return (
    <Card className="flex flex-col gap-4 py-5 px-3">
      <div>
        <p className="text-2xl font-semibold mb-5">Configuration</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <Label>Title</Label>
          <Input
            placeholder="Title"
            value={builderData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Description</Label>
          <Input
            placeholder="Description"
            value={builderData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label>Type</Label>
          <Select onValueChange={(value) => handleChange("type", value)} value={builderData.type}>
            <SelectTrigger>
              <SelectValue placeholder="Text Input Type" />
            </SelectTrigger>
            <SelectContent>
              {selectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Switch
            id="multi-select"
            checked={builderData.isMultiSelect}
            onCheckedChange={(checked) => handleChange("isMultiSelect", checked)}
          />
          <Label htmlFor="multi-select">Multi-select</Label>
        </div>
      </div>
    </Card>
  );
};

export default Builder;
