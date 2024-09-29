export type User = {
    id: string;
    username: string;
    email: string;
    hashedpassword: string;
  };
export type UniversityInfo = {
    id: number;
    university_name: string;
    program_name: string;
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