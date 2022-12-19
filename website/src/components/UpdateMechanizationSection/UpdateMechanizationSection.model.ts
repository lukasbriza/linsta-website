import { Props } from "@lukasbriza/lbui-lib";
import { MechanizationObjectExt } from "@utils";
import React from "react";

export type MechanizationUpdateUnitProps = {
  getActualList: () => Promise<void>;
  data: MechanizationObjectExt;
  setMechanizations: React.Dispatch<
    React.SetStateAction<MechanizationObjectExt[] | []>
  >;
} & Props<HTMLDivElement>;

export type ReadOnlySectionProps = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  data: MechanizationObjectExt;
  setMechanizations: React.Dispatch<
    React.SetStateAction<MechanizationObjectExt[] | []>
  >;
};

export type EditSectionProps = {
  getActualList: () => Promise<void>;
  data: MechanizationObjectExt;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditSectionInputs = {
  name: string;
  label: string;
  capacity: string;
  price: string;
  order: string;
  type: "M" | "SM" | "C";
};

export type StandardInputProps = {
  property: keyof Pick<
    EditSectionInputs,
    "capacity" | "label" | "name" | "price" | "order"
  >;
  label: string;
};
