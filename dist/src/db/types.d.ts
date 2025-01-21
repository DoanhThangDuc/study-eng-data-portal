import { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;
export type DB = {
    User: User;
};
export type User = {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    emailAddressVerified: boolean;
    administrator: boolean;
    enabled: boolean;
    passwordHashAlgorithm?: string;
    passwordHash?: string;
    passwordHashSalt?: string;
    password?: string;
};
