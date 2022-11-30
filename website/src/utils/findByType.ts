import { MechanizationObjectExt } from "./dbModels";

export const findByType = async (
  data: MechanizationObjectExt[],
  type: "M" | "SM" | "C"
) => {
  const result = data.filter((obj) => {
    if (obj.type === type) return obj;
  });
  return result;
};
