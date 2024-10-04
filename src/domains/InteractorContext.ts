import { TokenUser } from "./TokenUser";
import { Request } from "express";
export type InteractorContext = {
  user: TokenUser | undefined;
};

export interface AppRequest extends Request {
  user: TokenUser | undefined;
}
