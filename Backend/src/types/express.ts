import { AuthPayload } from "../modules/domain/auth/auth.types";

declare global {
  namespace Express {
    interface Request {
      user: AuthPayload;
      userToken: string;
    }
  }
}
