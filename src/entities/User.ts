import { UniversityTie, User as PrismaUser } from "@prisma/client";
import { v4 as uuid } from "uuid";

export class User implements PrismaUser {
  readonly id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  universityTie: UniversityTie;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) this.id = uuid();
  }
}
