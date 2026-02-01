import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z.string().min(5, "First name must be at least 5 characters"),
  careerTitle: z
    .string()
    .min(10, "Position title must be at least 10 characters"),
  careerObjective: z
    .string()
    .min(150, "Career objective must be at least 150 characters"),
});

export type PersonalInfoValues = z.infer<typeof personalInformationSchema>;
