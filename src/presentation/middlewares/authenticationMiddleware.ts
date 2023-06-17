import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretToken = "sdaFsadasdaGasdCMySecretKey";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, secretToken, (err, _) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  });
};

export default authenticateToken;