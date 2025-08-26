// types/user.ts
export interface User {
    id: string;
    email: string;
    role: 'customer' | 'employees' | 'admin' | 'super_admin';
    email_verified_at: string | null;
    is_active: boolean;
    remember_token?: string;
    created_at: string;
    updated_at: string;

    // Relationships (optional, can be loaded)
    profile?: UserProfile;
    employee?: Employee;
    customer?: Customer;
}

export interface UserProfile {
    id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    fullname: string;
    phone: string | null;
    avatar_url: string | null;
    timezone: string;
    preferred_language: string;
    created_at: string;
    updated_at: string;

    // Relationship
    user?: User;
}

export type UserWithProfile = User & { profile: UserProfile };

// types/employee.ts
export interface EmployeePermissions {
    manage_bookings?: boolean;
    view_customers?: boolean;
    manage_availability?: boolean;
    process_payments?: boolean;
    manage_employees?: boolean;
    view_reports?: boolean;
    // Add other specific permissions as needed
    [key: string]: boolean | undefined; // This allows for flexible keys but typed values
}

export interface Employee {
    id: string;
    user_id: string;
    employee_id: string | null;
    position: string | null;
    hourly_rate: number | null;
    hire_date: string | null;
    termination_date: string | null;
    permissions: EmployeePermissions | null;
    notes: string | null;
    created_at: string;
    updated_at: string;

    // Relationships (optional, can be loaded)
    user?: User;
}

export type EmployeeWithUser = Employee & { user: UserWithProfile };

// types/customer.ts
export interface Customer {
    id: string;
    user_id: string;
    customer_id: string | null;
    loyalty_points: number;
    preferences: CustomerPreferences | null;
    notes: string | null;
    created_at: string;
    updated_at: string;

    // Relationships (optional, can be loaded)
    user?: User;
}

export interface CustomerPreferences {
    notifications: boolean;
    newsletter: boolean;
    sms_alerts: boolean;
    [key: string]: boolean | undefined; // For additional preferences
}

export type CustomerWithUser = Customer & { user: UserWithProfile };
