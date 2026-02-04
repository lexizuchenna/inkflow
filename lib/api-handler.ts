import { NextResponse } from "next/server";
import { AppException, InternalServerException } from "../exceptions";

export const withErrorHandling = (handler: Function) => {
  return async (req: Request, ...args: any[]) => {
    try {
      return await handler(req, ...args);
    } catch (err: any) {
      console.log(err?.error, err);
      if (err instanceof AppException) {
        return NextResponse.json(
          {
            statusCode: err.statusCode,
            error: err.error,
            message: err.message,
          },
          { status: err.statusCode }
        );
      }

      const internalError = new InternalServerException();
      return NextResponse.json(
        {
          statusCode: internalError.statusCode,
          error: internalError.error,
          message: internalError.message,
        },
        { status: 500 }
      );
    }
  };
};
