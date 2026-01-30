import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utils/response";
import { MESSAGES } from "../../config/constants";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof Error) {
    return errorResponse(res, err.message, 400);
  }

  return errorResponse(res, MESSAGES.GENERAL.SOMETHING_WENT_WRONG, 500);
}
