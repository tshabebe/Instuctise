export const paths = {
  home: {
    getHref: () => '/',
  },

  auth: {
    register: {
      getHref: () => '/login',
    },
    login: {
      getHref: (userRole: string) => `/login/google?userRole=${userRole}`,
    },
    callback: {
      getHref: () => '/login/google/callback',
    },
  },

  app: {
    root: {
      getHref: () => '/',
    },
    dashboard: {
      getHref: () => '/home',
    },
  },
} as const;
