export default {
  apiBaseUrl: `http://${process.env.HOST || "localhost"}:${process.env.PORT || "3000"}${process.env.API_PREFIX || "/api"}`,
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
    },
    lists: {
      index: "/lists",
      clans: (id: number) => "/lists/" + id + "/clans",
    },
    records: {
      index: (listId: number, clanId: number) => `/records/clan/${clanId}/list/${listId}`,
    },
    groups: {
      index: "/permissions/groups"
    }
  }
}