import bcrypt from "bcrypt";
export const hashPassword = async (unhashedPassword: string) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(unhashedPassword, salt);
  return hashedPassword;
};
