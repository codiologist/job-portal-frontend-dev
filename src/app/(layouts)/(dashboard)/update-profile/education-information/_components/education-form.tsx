"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { TextInput } from "../../_components/form-inputs";

/* -------------------------------------------------------------------------- */
/*                               ZOD SCHEMA                                   */
/* -------------------------------------------------------------------------- */

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const educationItemSchema = z
  .object({
    degree: z.string().min(1, "Degree is required"),
    subject: z.string().min(2, "Subject is required"),
    institution: z.string().min(2, "Institution name is required"),
    passingYear: z
      .string()
      .regex(/^\d{4}$/, "Enter a valid year")
      .refine((y) => Number(y) <= new Date().getFullYear(), {
        message: "Passing year cannot be in the future",
      }),
    resultType: z.enum(["FIRST_CLASS", "SECOND_CLASS", "THIRD_CLASS", "GRADE"]),
    totalMarks: z.string().optional(),
    cgpa: z.string().optional(),
    certificate: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => !file || ALLOWED_FILE_TYPES.includes(file.type),
        "Only JPG, PNG or PDF files are allowed",
      )
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        "File size must be less than 2MB",
      ),
  })
  .superRefine((data, ctx) => {
    if (data.resultType === "GRADE" && !data.cgpa) {
      ctx.addIssue({
        path: ["cgpa"],
        message: "CGPA is required for Grade result",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.resultType !== "GRADE" && !data.totalMarks) {
      ctx.addIssue({
        path: ["totalMarks"],
        message: "Total marks are required for class result",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const educationFormSchema = z.object({
  educations: z.array(educationItemSchema).min(1),
});

type EducationFormValues = z.infer<typeof educationFormSchema>;

/* -------------------------------------------------------------------------- */
/*                                CONSTANTS                                   */
/* -------------------------------------------------------------------------- */

const DEGREE_OPTIONS = ["HSC", "Bachelor", "Masters"];

const RESULT_OPTIONS = [
  { label: "First Class", value: "FIRST_CLASS" },
  { label: "Second Class", value: "SECOND_CLASS" },
  { label: "Third Class", value: "THIRD_CLASS" },
  { label: "Grade", value: "GRADE" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                COMPONENT                                   */
/* -------------------------------------------------------------------------- */

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
          resultType: "FIRST_CLASS",
          totalMarks: "",
          cgpa: "",
          certificate: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        {fields.map((field, index) => {
          const resultType = form.watch(`educations.${index}.resultType`);
          const certificate = form.watch(`educations.${index}.certificate`);

          return (
            <div
              key={field.id}
              className="space-y-4 rounded-md border border-gray-200 p-4"
            >
              {/* Degree */}
              <FormField
                control={form.control}
                name={`educations.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam / Degree *</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="h-10 w-full rounded-sm border border-[#D0D5DD] bg-white px-3"
                      >
                        <option value="">Select degree</option>
                        {DEGREE_OPTIONS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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

              {/* Result Type */}
              <FormField
                control={form.control}
                name={`educations.${index}.resultType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result *</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="h-10 w-full rounded-sm border border-[#D0D5DD] bg-white px-3"
                      >
                        {RESULT_OPTIONS.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {resultType === "GRADE" ? (
                <TextInput
                  form={form}
                  name={`educations.${index}.cgpa`}
                  label="CGPA"
                  required
                />
              ) : (
                <TextInput
                  form={form}
                  name={`educations.${index}.totalMarks`}
                  label="Total Marks"
                  required
                />
              )}

              {/* Certificate Upload */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  id={`certificate-${index}`}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) =>
                    form.setValue(
                      `educations.${index}.certificate`,
                      e.target.files?.[0],
                      { shouldValidate: true, shouldDirty: true },
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
                  {certificate ? "Change File" : "Upload Certificate"}
                </Button>

                {certificate && (
                  <>
                    <span className="text-muted-foreground text-sm">
                      {certificate.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() =>
                        form.setValue(
                          `educations.${index}.certificate`,
                          undefined,
                        )
                      }
                    >
                      Remove
                    </Button>
                  </>
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
          );
        })}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              degree: "",
              subject: "",
              institution: "",
              passingYear: "",
              resultType: "FIRST_CLASS",
              totalMarks: "",
              cgpa: "",
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
