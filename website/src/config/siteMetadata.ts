export type MetaData = {
  companyName: string;
  phoneNumber: string;
  siteUrl: string;
  email: string;
  linkedin: string;
  facebook: string;
};

export const siteMetaData: MetaData = {
  companyName: "LINSTA stavební s.r.o.",
  phoneNumber: "+420606095352",
  siteUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://linsta.cz",
  email: "linsta@linsta.cz",
  linkedin: "",
  facebook: "",
};
