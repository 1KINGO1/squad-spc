export default {
  apiBaseUrl: `http://${process.env.HOST || "localhost"}:${process.env.PORT || "3000"}${process.env.API_PREFIX || "/api"}`,
  paths: {
    output: {
      index: "/output",
      path: (path: string) => "/output/" + path,
    },
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
      delete: "/clans/:id",
      limits: (id: number) => "/clans/" + id + "/limits",
      limitsReplace: (id: number) => "/clans/" + id + "/limits/replace",
    },
    users: {
      index: "/users",
      show: "/users/:id",
      create: "/users",
      update: "/users/:id",
      delete: "/users/:id"
    },
    lists: {
      index: "/lists",
      clans: (id: number) => "/lists/" + id + "/clans",
      create: "/lists",
      delete: (id: number) => "/lists/" + id
    },
    records: {
      index: (listId: number, clanId: number) => `/records/clan/${clanId}/list/${listId}`,
    },
    groups: {
      index: "/permissions/groups"
    }
  }
}