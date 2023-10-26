export const paths = {
  index: '/',
  checkout: '/checkout',
  tpaadd: '/tpa/add',
  contact: '/contact',
  pricing: '/pricing',
  auth: {
    auth0: {
      callback: '/auth/auth0/callback',
      login: '/auth/auth0/login',
    },
    jwt: {
      login: '/auth/jwt/login',
      register: '/auth/jwt/register',
    },
    firebase: {
      login: '/auth/firebase/login',
      register: '/auth/firebase/register',
    },
    amplify: {
      confirmRegister: '/auth/amplify/confirm-register',
      forgotPassword: '/auth/amplify/forgot-password',
      login: '/auth/amplify/login',
      register: '/auth/amplify/register',
      resetPassword: '/auth/amplify/reset-password',
    },
  },
  authDemo: {
    forgotPassword: {
      classic: '/auth-demo/forgot-password/classic',
      modern: '/auth-demo/forgot-password/modern',
    },
    login: {
      classic: '/auth-demo/login/classic',
      modern: '/auth-demo/login/modern',
    },
    register: {
      classic: '/auth-demo/register/classic',
      modern: '/auth-demo/register/modern',
    },
    resetPassword: {
      classic: '/auth-demo/reset-password/classic',
      modern: '/auth-demo/reset-password/modern',
    },
    verifyCode: {
      classic: '/auth-demo/verify-code/classic',
      modern: '/auth-demo/verify-code/modern',
    },
  },
  dashboard: {
    index: '/dashboard',
    academy: {
      index: '/academy',
      courseDetails: '/academy/courses/:courseId',
    },
    account: '/account',
    analytics: '/analytics',
    blank: '/blank',
    blog: {
      index: '/blog',
      postDetails: '/blog/:postId',
      postCreate: '/blog/create',
    },
    calendar: '/calendar',
    chat: '/chat',
    crypto: '/crypto',
    customers: {
      index: '/customers',
      details: '/customers/:customerId',
      edit: '/customers/:customerId/edit',
    },
    ecommerce: '/ecommerce',
    fileManager: '/file-manager',
    invoices: {
      index: '/invoices',
      details: '/invoices/:orderId',
    },
    jobs: {
      index: '/jobs',
      create: '/jobs/create',
      companies: {
        details: '/jobs/companies/:companyId',
      },
    },
    kanban: '/kanban',
    logistics: {
      index: '/logistics',
      fleet: '/logistics/fleet',
    },
    mail: '/mail',
    orders: {
      index: '/orders',
      details: '/orders/:orderId',
    },
    products: {
      index: '/products',
      create: '/products/create',
    },
    social: {
      index: '/social',
      profile: '/social/profile',
      feed: '/social/feed',
    },
  },
  components: {
    index: '/components',
    dataDisplay: {
      detailLists: '/components/data-display/detail-lists',
      tables: '/components/data-display/tables',
      quickStats: '/components/data-display/quick-stats',
    },
    lists: {
      groupedLists: '/components/lists/grouped-lists',
      gridLists: '/components/lists/grid-lists',
    },
    forms: '/components/forms',
    modals: '/components/modals',
    charts: '/components/charts',
    buttons: '/components/buttons',
    typography: '/components/typography',
    colors: '/components/colors',
    inputs: '/components/inputs',
  },
  docs: 'https://material-kit-pro-react-docs.devias.io',
  notAuthorized: '/401',
  notFound: '/404',
  serverError: '/500',
};
