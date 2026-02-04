import { z } from "zod";

export const socialLinkSchema = z.object({
  label: z.string().min(1, "Social platform is required"),

  url: z.string().min(1, "URL is required").url("Please enter a valid URL"),
});

export const personalInformationSchema = z
  .object({
    careerTitle: z
      .string()
      .min(10, "Position title must be at least 10 characters"),
    careerObjective: z
      .string()
      .min(15, "Career objective must be at least 150 characters"),
    fullName: z.string().min(5, "First name must be at least 5 characters"),
    fatherName: z.string().min(5, "Father name must be at least 5 characters"),
    motherName: z.string().min(5, "Mother name must be at least 5 characters"),
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
    mobileNo: z
      .string()
      .max(11, {
        message: "Phone number not more than 11 digit.",
      })
      .regex(/^(\+880\s?|0)1[3-9]\d{2}-?\d{6}$/, "Invalid phone number."),
    alternatePhone: z
      .string()
      .optional()
      .refine((val) => !val || /^(\+880\s?|0)1[3-9]\d{2}-?\d{6}$/.test(val), {
        message: "Invalid phone number.",
      }),
    emailAddress: z.string().email({
      message: "Please enter a valid email address.",
    }),
    gender: z.string().min(1, {
      message: "Please select your gender.",
    }),
    religionId: z.string().min(1, {
      message: "Please select your religion.",
    }),
    bloodGroupId: z.string().min(1, {
      message: "Please select your bloodgroup.",
    }),
    nationality: z.string().min(5, "Nationality is required."),
    nationalId: z
      .string()
      .min(10, {
        message: "Enter your NID 10 digits or 17 digit identification number.",
      })
      .max(17, {
        message: "Enter your NID 10 digits or 17 digit identification number.",
      }),
    socialLink: z
      .array(socialLinkSchema)
      .min(1, "At least one social link is required")
      .refine(
        (items) => new Set(items.map((i) => i.label)).size === items.length,
        {
          message: "Duplicate social platforms are not allowed",
        },
      ),

    portfolioLink: z.string().optional(),
    maritalStatus: z.string().min(1, {
      message: "Please select your marital status.",
    }),
    spouseName: z.string().optional(),

    skillIds: z.array(z.string()).min(1, "Select at least one skill"),
    interstIds: z.array(z.string()).min(1, "Select at least one interest"),
  })
  .superRefine((data, ctx) => {
    if (data.maritalStatus === "MARRIED") {
      if (!data.spouseName || data.spouseName.trim().length === 0) {
        ctx.addIssue({
          path: ["spouseName"],
          message: "Spouse name is required when marital status is married.",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export type PersonalInfoValues = z.infer<typeof personalInformationSchema>;
