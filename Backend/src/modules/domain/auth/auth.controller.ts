import { Request, Response, NextFunction } from "express";
import { LoginSchema, RegisterSchema } from "./auth.validation";
import { AuthService } from "./auth.service";
import { MESSAGES } from "../../../config/constants";
import { successResponse } from "../../../utils/response";
import { env } from "../../../config/env";

export const authcontroller = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      if (!env.allowRegister) {
        return res.status(403).json({
          message: MESSAGES.AUTH.FORBIDDEN,
        });
      }

      const parsed = RegisterSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
      }

      const result = await AuthService.register(parsed.data);

      return res.status(201).json({
        message: MESSAGES.USER.USER_CREATED,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = LoginSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
      }

      const result = await AuthService.login(parsed.data);

      return res.json({
        message: MESSAGES.AUTH.LOGIN_SUCCESS,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async me(req: Request, res: Response, next: NextFunction) {
    const user = await AuthService.findUserbyEmail(req.user.email);
    return successResponse(res, user, "");
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    await AuthService.Logout(req.userToken);
    return successResponse(res, MESSAGES.AUTH.LOGOUT_SUCCESS, "");
  },
};
