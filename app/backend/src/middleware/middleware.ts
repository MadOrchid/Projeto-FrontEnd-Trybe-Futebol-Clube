import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const middleware: ErrorRequestHandler = (error, _req, res, _next) => {
  const { name, message } = error;
  switch (name) {
    case 'ValidationError':
      res.status(StatusCodes.BAD_REQUEST).json({ message });
      break;
    case 'NotFound':
      res.status(StatusCodes.NOT_FOUND).json({ message });
      break;
    case 'Unauthorized':
      res.status(StatusCodes.UNAUTHORIZED).json({ message });
      break;
    default:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
  }
};

export default middleware;
