import Image from "next/image";
import ProfileContentCard from "./profile-content-card";

const EducationalInfoCard = () => {
  return (
    <section className="mt-10">
      <ProfileContentCard title="Education">
        <ul className="space-y-6">
          <li className="border-blue-water-300/50 flex flex-col gap-4 rounded-2xl border p-3 px-4 xl:flex-row xl:items-start xl:justify-between xl:p-6">
            <div className="space-y-1">
              <h4 className="text-blue-water-700 mb-1 text-2xl font-semibold">
                Secondary School Certificate (SSC)
              </h4>
              <p className="text-[18px] leading-7 font-semibold xl:text-xl">
                Science
              </p>
              <p className="text-base leading-5 font-medium xl:text-lg">
                Gazipur Cantonment Board High School
              </p>
              <div className="grid grid-cols-2 gap-2 xl:mt-2">
                <p className="text-sm font-medium xl:text-base">2004</p>
                <p className="text-sm font-medium xl:text-base">GPA: 4.10</p>
              </div>
            </div>
            <div className="rounded-sm border p-1">
              <Image
                src="/certificate.jpg"
                alt="University of Example"
                width={280}
                height={180}
                className="h-auto w-50 rounded-sm"
              />
            </div>
          </li>
        </ul>
      </ProfileContentCard>
    </section>
  );
};

export default EducationalInfoCard;
