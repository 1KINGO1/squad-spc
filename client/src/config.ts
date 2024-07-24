export default {
  apiBaseUrl: `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : window.location.origin}${process.env.API_PREFIX || "/api"}`,
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
      delete: (id: number) => "/clans/" + id,
      limits: (id: number) => "/clans/" + id + "/limits",
      limitsReplace: (id: number) => "/clans/" + id + "/limits/replace",
    },
    users: {
      index: (limit: number, orderBy: string, orderByField: string) => "/users" + `?limit=${limit}&orderBy=${orderBy}&orderByField=${orderByField}`,
      show: "/users/:id",
      create: "/users",
      update: (id: number) => "/users/" + id,
    },
    lists: {
      index: "/lists",
      clans: (id: number) => "/lists/" + id + "/clans",
      create: "/lists",
      delete: (id: number) => "/lists/" + id,
      update: (id: number) => "/lists/" + id,
    },
    records: {
      index: (listId: number, clanId: number) => `/records/clan/${clanId}/list/${listId}`,
      create: (listId: number, clanId: number) => `/records/clan/${clanId}/list/${listId}`,
      delete: (recordId: number) => `/records/${recordId}`
    },
    groups: {
      index: "/permissions/groups",
      update: (groupId: number) => `/permissions/groups/${groupId}`,
      delete: (groupId: number) => `/permissions/groups/${groupId}`,
      create: "/permissions/groups"
    },
    permissions: {
      index: "/permissions/permissions",
    }
  }
}