import { Badge } from '@/components/ui/badge';
import SvgColor from '@/components/ui/svg-color';
import { User } from '@/types/user.type';
import React, { useMemo } from 'react';
import { paths } from './paths';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} className="h-full w-full" />;

const ICONS = {
    dashboard: icon('ic_dashboard'),
    ecommerce: icon('ic_ecommerce'),
    analytics: icon('ic_analytics'),
    banking: icon('ic_banking'),
    booking: icon('ic_booking'),
    file: icon('ic_file'),

    user: icon('ic_user'),

    chat: icon('ic_chat'),
    mail: icon('ic_mail'),
    folder: icon('ic_folder'),
    calendar: icon('ic_calendar'),
    kanban: icon('ic_kanban'),

    cart: icon('ic_cart'),
    toolboxtalks: icon('mc_clipboard'),
    inspection: icon('hi_magnifying'),
    controlPanel: icon('control_panel'),
    employee: icon('ci_employee'),
    training: icon('mc_certificate'),
    incident: icon('ion_accessibility'),
};

// ----------------------------------------------------------------------

export type TMenuItem = {
    title: string;
    path?: string;
    icon?: React.JSX.Element;
    info?: React.JSX.Element;
    disabled?: boolean;
    caption?: string;
    children?: TMenuItem[] | undefined;
    // routeNames:
};

export type INavData = {
    subheader: string;
    items: TMenuItem[];
}[];

export const useNavData = (user?: User) => {
    return useMemo(
        () => [
            // GENERAL
            // ----------------------------------------------------------------------
            {
                subheader: 'general',
                items: [
                    {
                        title: 'HSE dashboard',
                        path: paths.dashboard.root,
                        icon: ICONS.analytics,
                    },
                    // {
                    // 	title: "app",
                    // 	path: paths.dashboard.root,
                    // 	icon: ICONS.dashboard,
                    // },
                    // {
                    // 	title: "ecommerce",
                    // 	path: paths.dashboard.general.ecommerce,
                    // 	icon: ICONS.ecommerce,
                    // },
                    // {
                    // 	title: "analytics",
                    // 	path: paths.dashboard.general.analytics,
                    // 	icon: ICONS.analytics,
                    // },
                    // {
                    // 	title: "banking",
                    // 	path: paths.dashboard.general.banking,
                    // 	icon: ICONS.banking,
                    // },
                    // {
                    // 	title: "booking",
                    // 	path: paths.dashboard.general.booking,
                    // 	icon: ICONS.booking,
                    // },
                    {
                        title: 'file',
                        path: paths.dashboard.general.file,
                        icon: ICONS.file,
                    },
                ],
            },

            // HSE
            // ----------------------------------------------------------------------
            {
                subheader: 'HSE',
                items: [
                    // COMPANY INFORMATION
                    {
                        title: 'control panel',
                        path: paths.dashboard.controlPannel.root,
                        icon: ICONS.controlPanel,
                        children: [
                            { title: 'company', path: paths.dashboard.controlPannel.company },
                            { title: 'project details', path: paths.dashboard.controlPannel.projectDetails },
                            { title: 'positions', path: paths.dashboard.controlPannel.positions },
                            { title: 'departments', path: paths.dashboard.controlPannel.departments },
                        ],
                    },

                    // USER
                    {
                        title: 'user',
                        path: paths.dashboard.user.root,
                        icon: ICONS.user,
                        children: [
                            { title: 'create', path: paths.dashboard.user.create },
                            {
                                title: 'profile',
                                path: user ? paths.dashboard.user.profile(user.username) : paths.dashboard.user.defaultProfile,
                            },
                            // { title: "cards", path: paths.dashboard.user.cards },
                            { title: 'list', path: paths.dashboard.user.list },
                            { title: 'settings', path: paths.dashboard.user.settings },
                        ],
                    },

                    // EMPLOYEE
                    {
                        title: 'employee',
                        path: paths.dashboard.employee.root,
                        icon: ICONS.employee,
                        children: [
                            { title: 'create', path: paths.dashboard.employee.create },
                            { title: 'list', path: paths.dashboard.employee.list },
                        ],
                    },

                    // TRAINING
                    {
                        title: 'training',
                        path: paths.dashboard.training.root,
                        icon: ICONS.training,
                        children: [
                            {
                                title: 'internal',
                                path: paths.dashboard.training.internal.root,
                                children: [
                                    { title: 'create', path: paths.dashboard.training.internal.create },
                                    { title: 'register', path: paths.dashboard.training.internal.register },
                                    { title: 'in house', path: paths.dashboard.training.internal.inHouse },
                                    { title: 'internal matrix', path: paths.dashboard.training.internal.matrixReport },
                                ],
                            },
                            {
                                title: 'external',
                                path: paths.dashboard.training.external.root,
                                children: [
                                    { title: 'create', path: paths.dashboard.training.external.create },
                                    { title: 'register', path: paths.dashboard.training.external.register },
                                    { title: 'third party', path: paths.dashboard.training.external.thirdParty },
                                    { title: 'internal matrix', path: paths.dashboard.training.external.matrixReport },
                                ],
                            },
                            {
                                title: 'matrix report',
                                path: paths.dashboard.training.matrixReport,
                            },
                        ],
                    },

                    // INSPECTION
                    {
                        title: 'inspection',
                        path: paths.dashboard.inspection.root,
                        icon: ICONS.inspection,
                        children: [
                            {
                                title: 'tracker',
                                path: paths.dashboard.inspection.tracker,
                            },
                            {
                                title: 'site',
                                path: paths.dashboard.inspection.site.root,
                                children: [
                                    {
                                        title: 'create',
                                        path: paths.dashboard.inspection.site.create,
                                    },
                                    {
                                        title: 'list',
                                        path: paths.dashboard.inspection.site.list,
                                    },
                                    {
                                        title: 'report',
                                        path: paths.dashboard.inspection.site.report,
                                    },
                                ],
                            },
                            {
                                title: 'inspector',
                                path: paths.dashboard.inspection.inspector.root,
                                children: [
                                    {
                                        title: 'list',
                                        path: paths.dashboard.inspection.inspector.list,
                                    },
                                    {
                                        title: 'authorized positions',
                                        path: paths.dashboard.inspection.inspector.authorizedPosition,
                                    },
                                ],
                            },
                            {
                                title: 'machineries',
                                disabled: true,
                            },
                            {
                                title: 'tools & equipments',
                                disabled: true,
                            },
                        ],
                    },

                    // TOOLBOXTALKS
                    {
                        title: 'toolbox talks',
                        path: paths.dashboard.toolboxtalks.root,
                        icon: ICONS.toolboxtalks,
                        children: [
                            {
                                title: 'tracker',
                                path: paths.dashboard.toolboxtalks.tracker,
                            },
                            {
                                title: 'create',
                                path: paths.dashboard.toolboxtalks.create(),
                            },
                            {
                                title: 'list',
                                path: paths.dashboard.toolboxtalks.list.root,
                                children: [
                                    {
                                        title: 'civil',
                                        path: paths.dashboard.toolboxtalks.list.civil,
                                    },
                                    {
                                        title: 'electrical',
                                        path: paths.dashboard.toolboxtalks.list.electrical,
                                    },
                                    {
                                        title: 'mechanical',
                                        path: paths.dashboard.toolboxtalks.list.mechanical,
                                    },
                                    {
                                        title: 'workshop',
                                        path: paths.dashboard.toolboxtalks.list.workshop,
                                    },
                                    {
                                        title: 'office',
                                        path: paths.dashboard.toolboxtalks.list.office,
                                    },
                                ],
                            },
                            {
                                title: 'report',
                                path: paths.dashboard.toolboxtalks.report,
                            },
                            {
                                title: 'statistic',
                                path: paths.dashboard.toolboxtalks.statistic,
                            },
                        ],
                    },

                    // PPE
                    {
                        title: 'PPE',
                        path: paths.dashboard.ppe.root,
                        icon: ICONS.cart,
                        children: [
                            {
                                title: 'create',
                                path: paths.dashboard.ppe.create,
                            },
                            {
                                title: 'list',
                                path: paths.dashboard.ppe.list,
                            },
                            {
                                title: 'report',
                                path: paths.dashboard.ppe.report.root,
                                children: [
                                    {
                                        title: 'create',
                                        path: paths.dashboard.ppe.report.create,
                                    },
                                    {
                                        title: 'list',
                                        path: paths.dashboard.ppe.report.list,
                                    },
                                ],
                            },
                        ],
                    },

                    {
                        title: 'incident',
                        path: paths.dashboard.incident.root,
                        icon: ICONS.incident,
                        children: [
                            { title: 'create', path: paths.dashboard.incident.create },
                            { title: 'list', path: paths.dashboard.incident.list },
                            { title: 'report', path: paths.dashboard.incident.report },
                        ],
                    },

                    // FILE MANAGER
                    {
                        title: 'file manager',
                        path: paths.dashboard.fileManager,
                        icon: ICONS.folder,
                    },
                ],
            },
            {
                subheader: 'app',
                items: [
                    // MAIL
                    {
                        title: 'mail',
                        path: paths.dashboard.mail,
                        icon: ICONS.mail,
                        info: (
                            <Badge variant="destructive" className="rounded-md">
                                +32
                            </Badge>
                        ),
                        disabled: true,
                    },

                    // CHAT
                    {
                        title: 'chat',
                        path: paths.dashboard.chat,
                        icon: ICONS.chat,
                        disabled: true,
                    },

                    // CALENDAR
                    {
                        title: 'calendar',
                        path: paths.dashboard.calendar,
                        icon: ICONS.calendar,
                        disabled: true,
                    },

                    // KANBAN
                    {
                        title: 'kanban',
                        path: paths.dashboard.kanban,
                        icon: ICONS.kanban,
                        disabled: true,
                    },
                ],
            },
        ],
        [user],
    );
};
