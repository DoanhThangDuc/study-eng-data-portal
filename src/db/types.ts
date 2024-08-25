import { Generated, Insertable, Selectable, Updateable } from "kysely";

export type DB = {
  user: User;
};

export interface User {
  id: Generated<number>;
  email: string;
  firstName: string;
  lastName: string;
}

export type Person = Selectable<User>;
export type NewPerson = Insertable<User>;
export type PersonUpdate = Updateable<User>;
