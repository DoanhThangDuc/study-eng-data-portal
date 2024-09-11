export type InteractorContext = {
  user: TokenUser | undefined;
};

export type TokenUser = {
  readonly id: string;
  readonly vanityName: string;
  readonly emailAddressVerified: boolean;
  readonly administrator: boolean;
  readonly enabled: boolean;
};
