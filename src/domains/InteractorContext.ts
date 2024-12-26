import { Logger } from "@nestjs/common";
import { TokenUser } from "./TokenUser";
import { Request } from "express";
export type InteractorContext = {
  user: TokenUser | undefined;
  requestId: string | undefined;
  logger: Logger | undefined;
};

export interface AppRequest extends Request {
  user: TokenUser | undefined;
  requestId: string | undefined;
  logger: Logger | undefined;
}
