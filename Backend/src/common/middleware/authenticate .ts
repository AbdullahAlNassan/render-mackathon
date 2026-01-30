import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { AuthPayload } from "../../modules/domain/auth/auth.types";
import { AuthRepository } from "../../modules/domain/auth/auth.repository";
import { errorResponse } from "../../utils/response";
import { MESSAGES } from "../../config/constants";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("authorization");

  if (!authHeader) {
    return errorResponse(res, MESSAGES.AUTH.UNAUTHORIZED, 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return errorResponse(res, MESSAGES.AUTH.UNAUTHORIZED, 401);
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as AuthPayload;

    const storedToken = await AuthRepository.findToken(token);
    if (!storedToken) {
      return errorResponse(res, MESSAGES.AUTH.TOKEN_MISSING, 401);
    }

    req.user = decoded;
    req.userToken = token;

    return next();
  } catch (_err) {
    return errorResponse(res, MESSAGES.AUTH.TOKEN_INVALID, 401);
  }
};
