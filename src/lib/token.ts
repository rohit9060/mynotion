import jwt from "jsonwebtoken";

export const createJwtToken = (
  payload: object,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const verifyJwtToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
