import { Methods } from "../models";

export const isAllowed = (
  methods: Methods,
  reqMethod: string | undefined
): boolean => {
  return methods.find((value) => {
    return value === reqMethod;
  })
    ? true
    : false;
};
