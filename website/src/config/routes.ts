export const routes = {
  home: "/",
  contact: "/contact",
  mechanization: "/mechanization",
  references: "/references",
  services: "/services",
  login: "/login",
  gdpr: "/gdpr",
  administration: "/protected",
} as const;

export const apiRoutes = {
  users: "/api/users",
  login: "/api/login",
  postImage: "/api/image/post",
  getImage: "/api/image/get",
  removeImage: "/api/image/remove",
  mechanization: "/api/mechanizations",
  references: "/api/references",
} as const;
