import { z } from "zod";

export const educationItemSchema = z.object({
  degree: z.string().min(2, "Degree is required"),
  subject: z.string().min(2, "Subject is required"),
  institution: z.string().min(2, "Institution name is required"),
  passingYear: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid year")
    .refine((year) => Number(year) <= new Date().getFullYear(), {
      message: "Passing year cannot be in the future",
    }),
  result: z.string().min(1, "Result is required"),
  certificate: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Invalid certificate file",
    ),
});

export const educationFormSchema = z.object({
  educations: z.array(educationItemSchema).min(1, "Add at least one education"),
});

export type EducationFormValues = z.infer<typeof educationFormSchema>;
