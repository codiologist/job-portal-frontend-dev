type Option = {
  id: string;
  name?: string; // used in bloodGroup & religion
  skillName?: string; // used in skills
  interstName?: string; // used in interests (note: spelling preserved as in your data)
};

type BloodGroup = {
  id: string;
  name: string; // e.g., "A+"
};

type Religion = {
  id: string;
  name: string; // e.g., "Islam"
};

type Skill = {
  id: string;
  skillName: string; // e.g., "JavaScript"
};

type Interest = {
  id: string;
  interstName: string; // e.g., "Programming"
};

export type TUserOptionsStrict = {
  religion: Religion;
  skills: Skill;
  interests: Interest;
  bloodGroup: BloodGroup;
};
