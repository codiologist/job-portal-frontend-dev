import { z } from "zod";

export const socialLinkSchema = z.object({
  label: z.string().min(1, "Social platform is required"),

  url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
});

export const personalInformationSchema = z.object({
  careerTitle: z
    .string()
    .min(10, "Position title must be at least 10 characters"),
  careerObjective: z
    .string()
    .min(15, "Career objective must be at least 150 characters"),
  fullName: z.string().min(5, "First name must be at least 5 characters"),
  fatherName: z.string().min(5, "Father name must be at least 5 characters"),
  motherName: z.string().min(5, "Mother name must be at least 5 characters"),
  religionId: z.string().min(1, {
    // Changed from z.string({ required_error: ... })
    message: "Please select your religion.",
  }),
  dob: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().refine(
      (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < date.getDate())
        ) {
          age--;
        }
        return age >= 18;
      },
      { message: "You must be at least 18 years old." },
    ),
  ),

  socialLink: z
    .array(socialLinkSchema)
    .min(1, "At least one social link is required")
    .refine(
      (items) => new Set(items.map((i) => i.label)).size === items.length,
      {
        message: "Duplicate social platforms are not allowed",
      },
    ),

  skillIds: z.array(z.string()).min(1, "Select at least one skill"),
  // interstIds: z
  //   .array(z.string().uuid())
  //   .min(1, "Please select at least one skill"),
});

export type PersonalInfoValues = z.infer<typeof personalInformationSchema>;
