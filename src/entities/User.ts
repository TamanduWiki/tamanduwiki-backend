export type UniversityTie = 'student' | 'teacher' | 'employee';

export type UserStatus = 'active' | 'pending_auth' | 'suspended' | 'banned';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  universityTie: UniversityTie;
  createdAt: Date;
  updatedAt: Date;
  status: UserStatus;
}
