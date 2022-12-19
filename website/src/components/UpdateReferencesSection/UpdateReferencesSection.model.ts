import { Props } from "@lukasbriza/lbui-lib";
import { ReferenceObjectExt } from "@utils";
import React from "react";

export type ReferenceUpdateUnitProps = {
  getActualList: () => Promise<void>;
  data: ReferenceObjectExt;
  setReferences: React.Dispatch<
    React.SetStateAction<ReferenceObjectExt[] | []>
  >;
} & Props<HTMLDivElement>;

export type ReadOnlySectionProps = {
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  data: ReferenceObjectExt;
  setReferences: React.Dispatch<
    React.SetStateAction<ReferenceObjectExt[] | []>
  >;
};

export type EditSectionProps = {
  getActualList: () => Promise<void>;
  data: ReferenceObjectExt;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditSectionInputs = {
  name: string;
  place: string;
  detail: string;
  realization: string;
};

export type StandardInputProps = {
  property: keyof Pick<EditSectionInputs, "name" | "place" | "realization">;
  label: string;
};
