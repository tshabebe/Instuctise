export const paths = {
  home: {
    getHref: () => '/',
  },

  auth: {
    register: {
      getHref: () => '/auth/login',
    },
    login: {
      getHref: (userRole: string) => `/auth/login?userRole=${userRole}`,
    },
    callback: {
      getHref: () => '/auth/login/callback',
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
