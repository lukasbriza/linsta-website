export type loginResponseDecoded = {
  _id: string;
  permission: "ADMIN" | "USER";
  iat: number;
  exp: number;
};
