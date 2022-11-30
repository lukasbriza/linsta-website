import { Props } from "@lukasbriza/lbui-lib";
import React from "react";
import { ReturnUserObject } from "src/abl/Users/_models";

export type UserUpdateUnitProps = {
  getActualList: () => Promise<void>;
  data: ReturnUserObject;
  setUsers: React.Dispatch<React.SetStateAction<ReturnUserObject[] | []>>;
};

export type ReadOnlySectionProps = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  data: ReturnUserObject;
  setUsers: React.Dispatch<React.SetStateAction<ReturnUserObject[] | []>>;
};

export type EditSectionProps = {
  getActualList: () => Promise<void>;
  data: ReturnUserObject;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditSectionInputs = {
  _id: string;
  name: string;
  password?: string;
  permission: "ADMIN" | "USER";
};

export type StandardInputProps = {
  property: keyof Pick<EditSectionInputs, "name" | "password">;
  label: string;
};
