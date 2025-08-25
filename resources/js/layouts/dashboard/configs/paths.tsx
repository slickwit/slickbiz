//

// ----------------------------------------------------------------------

const ROOTS = {
    DASHBOARD: '/dashboard',
};

export const paths = {
    // DASHBOARD
    dashboard: {
        root: ROOTS.DASHBOARD,
        mail: `${ROOTS.DASHBOARD}/mail`,
        chat: `${ROOTS.DASHBOARD}/chat`,
        blank: `${ROOTS.DASHBOARD}/blank`,
        kanban: `${ROOTS.DASHBOARD}/kanban`,
        calendar: `${ROOTS.DASHBOARD}/calendar`,
        fileManager: `${ROOTS.DASHBOARD}/file-manager`,
        permission: `${ROOTS.DASHBOARD}/permission`,
        general: {
            app: `${ROOTS.DASHBOARD}/app`,
            ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
            analytics: `${ROOTS.DASHBOARD}/analytics`,
            banking: `${ROOTS.DASHBOARD}/banking`,
            booking: `${ROOTS.DASHBOARD}/booking`,
            file: `${ROOTS.DASHBOARD}/file`,
        },
        controlPannel: {
            root: `${ROOTS.DASHBOARD}/control-pannel`,
            projectDetails: `${ROOTS.DASHBOARD}/control-pannel/project-details`,
            positions: `${ROOTS.DASHBOARD}/control-pannel/positions`,
            departments: `${ROOTS.DASHBOARD}/control-pannel/departments`,
            company: `${ROOTS.DASHBOARD}/control-pannel/company`,
        },
        user: {
            root: `${ROOTS.DASHBOARD}/user`,
            create: `${ROOTS.DASHBOARD}/user/create`,
            list: `${ROOTS.DASHBOARD}/user/list`,
            cards: `${ROOTS.DASHBOARD}/user/cards`,
            defaultProfile: `${ROOTS.DASHBOARD}/user/default`,
            profile: (username: string) => `${ROOTS.DASHBOARD}/user/${username}`,
            profileTab: (username: string, tab: string) => `${ROOTS.DASHBOARD}/user/${username}/${tab}`,
            settings: `${ROOTS.DASHBOARD}/user/settings`,
            edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
        },
        employee: {
            root: `${ROOTS.DASHBOARD}/employee`,
            create: `${ROOTS.DASHBOARD}/employee/create`,
            new: `${ROOTS.DASHBOARD}/employee/new`,
            list: `${ROOTS.DASHBOARD}/employee/list`,
            edit: (id: string) => `${ROOTS.DASHBOARD}/employee/${id}/edit`,
        },
        training: {
            root: `${ROOTS.DASHBOARD}/training`,
            internal: {
                root: `${ROOTS.DASHBOARD}/training/internal`,
                create: `${ROOTS.DASHBOARD}/training/internal/create`,
                register: `${ROOTS.DASHBOARD}/training/internal/register`,
                inHouse: `${ROOTS.DASHBOARD}/training/internal/in-house`,
                matrixReport: `${ROOTS.DASHBOARD}/training/internal/matrix-report`,
            },
            external: {
                root: `${ROOTS.DASHBOARD}/training/external`,
                create: `${ROOTS.DASHBOARD}/training/external/create`,
                register: `${ROOTS.DASHBOARD}/training/external/register`,
                thirdParty: `${ROOTS.DASHBOARD}/training/external/third-party`,
                matrixReport: `${ROOTS.DASHBOARD}/training/external/matrix-report`,
            },
            matrixReport: `${ROOTS.DASHBOARD}/training/matrix-report`,
        },
        inspection: {
            root: `${ROOTS.DASHBOARD}/inspection`,
            tracker: `${ROOTS.DASHBOARD}/inspection/tracker`,
            inspector: {
                root: `${ROOTS.DASHBOARD}/inspection/inspector`,
                list: `${ROOTS.DASHBOARD}/inspection/inspector/list`,
                authorizedPosition: `${ROOTS.DASHBOARD}/inspection/inspector/authorized-position`,
            },
            site: {
                root: `${ROOTS.DASHBOARD}/inspection/site`,
                detail: (id: string) => `${ROOTS.DASHBOARD}/inspection/site/${id}`,
                create: `${ROOTS.DASHBOARD}/inspection/site/create`,
                list: `${ROOTS.DASHBOARD}/inspection/site/list`,
                report: `${ROOTS.DASHBOARD}/inspection/site/report`,
            },
        },
        toolboxtalks: {
            root: `${ROOTS.DASHBOARD}/toolbox-talks`,
            tracker: `${ROOTS.DASHBOARD}/toolbox-talks/tracker`,
            create: (type?: string) => (!type ? `${ROOTS.DASHBOARD}/toolbox-talks/create` : `${ROOTS.DASHBOARD}/toolbox-talks/create?type=${type}`),
            report: `${ROOTS.DASHBOARD}/toolbox-talks/report`,
            statistic: `${ROOTS.DASHBOARD}/toolbox-talks/statistic`,
            list: {
                root: `${ROOTS.DASHBOARD}/toolbox-talks/list`,
                civil: `${ROOTS.DASHBOARD}/toolbox-talks/list/civil`,
                electrical: `${ROOTS.DASHBOARD}/toolbox-talks/list/electrical`,
                mechanical: `${ROOTS.DASHBOARD}/toolbox-talks/list/mechanical`,
                workshop: `${ROOTS.DASHBOARD}/toolbox-talks/list/workshop`,
                office: `${ROOTS.DASHBOARD}/toolbox-talks/list/office`,
            },
        },
        ppe: {
            root: `${ROOTS.DASHBOARD}/ppe`,
            create: `${ROOTS.DASHBOARD}/ppe/create`,
            list: `${ROOTS.DASHBOARD}/ppe/list`,
            report: {
                root: `${ROOTS.DASHBOARD}/ppe/report`,
                create: `${ROOTS.DASHBOARD}/ppe/report/create`,
                list: `${ROOTS.DASHBOARD}/ppe/report/list`,
            },
        },
        incident: {
            root: `${ROOTS.DASHBOARD}/incident`,
            create: `${ROOTS.DASHBOARD}/incident/create`,
            list: `${ROOTS.DASHBOARD}/incident/list`,
            report: `${ROOTS.DASHBOARD}/incident/report`,
        },
    },
    // comingSoon: "/coming-soon",
    // maintenance: "/maintenance",
    // pricing: "/pricing",
    // payment: "/payment",
    // about: "/about-us",
    // contact: "/contact-us",
    // faqs: "/faqs",
    // page403: "/error/403",
    // page404: "/error/404",
    // page500: "/error/500",
    // components: "/components",
    // docs: "https://docs.minimals.cc",
    // changelog: "https://docs.minimals.cc/changelog",
    // zoneUI: "https://mui.com/store/items/zone-landing-page/",
    // minimalUI: "https://mui.com/store/items/minimal-dashboard/",
    // freeUI: "https://mui.com/store/items/minimal-dashboard-free/",
    // figma: "https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0",
    // product: {
    // 	root: "/product",
    // 	checkout: "/product/checkout",
    // 	details: (id: string) => `/product/${id}`,
    // },
    // post: {
    // 	root: "/post",
    // 	details: (title: string) => `/post/${paramCase(title)}`,
    // },
    // AUTH
    // auth: {
    //   amplify: {
    //     login: `${ROOTS.AUTH}/amplify/login`,
    //     verify: `${ROOTS.AUTH}/amplify/verify`,
    //     register: `${ROOTS.AUTH}/amplify/register`,
    //     newPassword: `${ROOTS.AUTH}/amplify/new-password`,
    //     forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    //   },
    //   jwt: {
    //     login: `${ROOTS.AUTH}/jwt/login`,
    //     register: `${ROOTS.AUTH}/jwt/register`,
    //   },
    //   firebase: {
    //     login: `${ROOTS.AUTH}/firebase/login`,
    //     verify: `${ROOTS.AUTH}/firebase/verify`,
    //     register: `${ROOTS.AUTH}/firebase/register`,
    //     forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    //   },
    //   auth0: {
    //     login: `${ROOTS.AUTH}/auth0/login`,
    //   },
    // },
    // authDemo: {
    //   classic: {
    //     login: `${ROOTS.AUTH_DEMO}/classic/login`,
    //     register: `${ROOTS.AUTH_DEMO}/classic/register`,
    //     forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
    //     newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
    //     verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    //   },
    //   modern: {
    //     login: `${ROOTS.AUTH_DEMO}/modern/login`,
    //     register: `${ROOTS.AUTH_DEMO}/modern/register`,
    //     forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
    //     newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
    //     verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    //   },
    // },
} as const;

export type TPaths = typeof paths;
