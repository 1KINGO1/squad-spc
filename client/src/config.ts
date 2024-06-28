export default {
  apiBaseUrl: "http://localhost:3000/api",
  paths: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
      me: "/auth/me"
    },
    clans: {
      index: "/clans",
      show: "/clans/:id",
      create: "/clans",
      update: (id: number) => "/clans/" + id,
      delete: "/clans/:id"
    },
    users: {
      index: "/users",
      show: "/users/:id",
      create: "/users",
      update: "/users/:id",
      delete: "/users/:id"
    }
  }
}