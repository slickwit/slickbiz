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

        // TOUR
        tour: {
            root: `${ROOTS.DASHBOARD}/tour`,
        },
    },
} as const;

export type TPaths = typeof paths;
