export type User = {
    id: string;
    username: string;
    email: string;
    hashedpassword: string;
  };

export type MajorInfo = {
  id: number;
  name: string;
}
export type UniversityInfo = {
    id: number;
    university_name: string;
    degree: DegreeInfo;
    major: MajorInfo;
    program_duration: string;
    gre_requirement: string;
    university_logo_url: string;
    application_deadline: string;
}
export type RefereeInfo = {
  id: number;
  name: string;
  position: string;
  avatar_url: string;
  institution: string;
  recommendation_status: string;
  email: string;
}
export type DegreeInfo = {
  id: number;
  name: string;
}
