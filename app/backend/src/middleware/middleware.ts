import { ErrorRequestHandler } from 'express';

export const middlewareError: ErrorRequestHandler = (error, _req, res, next) => {
  const { name, message } = error;
  res.status(name).json({ message });

  next();
};

export default class ErrorHandler extends Error {
  public status: number;

  constructor(status: number, message:string) {
    super(message);
    this.status = status;
  }
}
