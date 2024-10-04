export type UserResponse = {
  id: string;
  vanityName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  emailAddress: string;
  emailAddressVerified: boolean;
  administrator: boolean;
  joined: Date | null;
};
