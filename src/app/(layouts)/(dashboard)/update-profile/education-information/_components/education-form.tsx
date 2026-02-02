"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  educationFormSchema,
  type EducationFormValues,
} from "@/schemas/education.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { SelectInput, TextInput } from "../../_components/form-inputs";

const DEGREE_OPTIONS = [
  { label: "HSC", value: "HSC" },
  { label: "Bachelor", value: "Bachelor" },
  { label: "Masters", value: "Masters" },
];

export default function EducationForm() {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      educations: [
        {
          degree: "",
          subject: "",
          institution: "",
          passingYear: "",
          result: "",
          certificate: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const onSubmit = (values: EducationFormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 rounded-md border border-gray-200 p-4"
          >
            <SelectInput
              form={form}
              name={`educations.${index}.degree`}
              label="Exam / Degree"
              options={DEGREE_OPTIONS}
              required
            />

            <TextInput
              form={form}
              name={`educations.${index}.subject`}
              label="Subject"
              required
            />

            <TextInput
              form={form}
              name={`educations.${index}.institution`}
              label="Institution"
              required
            />

            <TextInput
              form={form}
              name={`educations.${index}.passingYear`}
              label="Passing Year"
              type="number"
              required
            />

            <TextInput
              form={form}
              name={`educations.${index}.result`}
              label="Result / GPA"
              required
            />

            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="application/pdf,image/*"
                id={`certificate-${index}`}
                className="hidden"
                onChange={(e) =>
                  form.setValue(
                    `educations.${index}.certificate`,
                    e.target.files?.[0],
                    { shouldDirty: true, shouldValidate: true },
                  )
                }
              />
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  document.getElementById(`certificate-${index}`)?.click()
                }
              >
                Upload Certificate
              </Button>
              {form.watch(`educations.${index}.certificate`) && (
                <span className="text-muted-foreground text-sm">
                  {form.watch(`educations.${index}.certificate`)?.name}
                </span>
              )}
            </div>

            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              degree: "",
              subject: "",
              institution: "",
              passingYear: "",
              result: "",
              certificate: undefined,
            })
          }
        >
          + Add More Education
        </Button>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
