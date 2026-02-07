import PersonalInformationForm from "./_components/personal-information-form";
import { ResumeUploadForm } from "./_components/resume-upload-form";

const PersonalInfoPage = () => {
  return (
    <div className="space-y-8">
      <section>
        <PersonalInformationForm />
      </section>
      <section>
        <ResumeUploadForm />
      </section>
    </div>
  );
};

export default PersonalInfoPage;
