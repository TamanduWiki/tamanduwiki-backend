import { UniversityTie } from "@prisma/client";

export interface ICreateUserRequestDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  universityTie: UniversityTie;
}
