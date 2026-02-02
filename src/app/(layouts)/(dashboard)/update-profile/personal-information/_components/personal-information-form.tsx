"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  PersonalInfoValues,
  personalInformationSchema,
} from "@/schemas/personal-information.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, TextInitial, User } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
import { LiaUserTieSolid } from "react-icons/lia";
import ProfileContentCard from "../../../_components/profile-content-card";
import {
  DatePickerInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from "../../_components/form-inputs";

const religionOptions = [
  { label: "Islam", value: "ISLAM" },
  { label: "Hinduism", value: "HINDUISM" },
  { label: "Christianity", value: "CHRISTIANITY" },
  { label: "Buddhism", value: "BUDDHISM" },
  { label: "Other", value: "OTHER" },
];

const PersonalInformationForm = () => {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(
      personalInformationSchema,
    ) as unknown as Resolver<PersonalInfoValues>,
    defaultValues: {
      careerTitle: "",
      careerObjective: "",
      fullName: "",
      fatherName: "",
      motherName: "",
      dob: undefined,
      religion: "",
    },
  });

  function onSubmit(data: PersonalInfoValues) {
    console.log(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-14">
          <ProfileContentCard title="Career Details">
            <div className="space-y-6">
              <TextInput
                form={form}
                name="careerTitle"
                label="Position Title"
                placeholder="Enter your positon (i.e. Senior Software Engineer)"
                required
                icon={<BriefcaseBusiness />}
              />
              <TextAreaInput
                form={form}
                name="careerObjective"
                className="text-base!"
                label="Career Objective"
                placeholder="Tell us about yourself"
                required
                icon={<TextInitial />}
              />
            </div>
          </ProfileContentCard>
          <ProfileContentCard title="Personal Information" className="mt-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <TextInput
                form={form}
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                required
                icon={<LiaUserTieSolid className="size-6.5" />}
              />
              <TextInput
                form={form}
                name="fatherName"
                label="Father Name"
                placeholder="Enter your full name"
                required
                icon={<User />}
              />
              <TextInput
                form={form}
                name="motherName"
                label="Mother Name"
                placeholder="Enter your full name"
                required
                icon={<User />}
              />

              <DatePickerInput
                form={form}
                name="dob"
                label="Date of Birth (DD/MM/YYYY)"
                placeholder="Select your date of birth"
                required
              />

              <SelectInput
                form={form}
                name="religion"
                label="Religion"
                options={religionOptions}
                required
              />
            </div>
          </ProfileContentCard>
        </div>
        <div className="mt-6 text-right">
          <Button type="submit" className="rounded-sm text-base font-semibold">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalInformationForm;
