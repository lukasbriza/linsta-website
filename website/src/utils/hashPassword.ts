import bcryptjs from "bcryptjs";
export const hashPassword = async (unhashedPassword: string) => {
  const salt = await bcryptjs.genSalt();
  const hashedPassword = await bcryptjs.hash(unhashedPassword, salt);
  return hashedPassword;
};
