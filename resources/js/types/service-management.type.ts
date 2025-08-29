//

// ----------------------------------------------------------------------

// Category types
export interface Category {
    id: number;
    user_id: number;
    name: string;
    slug: string;
    description?: string;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

// Service types
export interface Service {
    id: number;
    user_id: number;
    category_id?: number;
    name: string;
    slug: string;
    description?: string;
    max_capacity: number;
    features?: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

    // counts
    reservations_count?: number;
    upcoming_reservations_count?: number;
    completed_reservations_count?: number;
    cancelled_reservations_count?: number;

    // Relationships (when loaded with)
    default_price?: Price;
    category?: Category;
    prices?: Price[];
    taxes?: Tax[];
    extras_groups?: ExtrasGroup[];
}

// Price types
export interface Price {
    id: number;
    user_id: number;
    service_id: number;
    name: string;
    amount: number;
    type: 'fixed' | 'hourly' | 'daily' | 'per_person';
    is_default: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

// Tax types
export interface Tax {
    id: number;
    user_id: number;
    name: string;
    description?: string;
    rate: number;
    type: 'percentage' | 'fixed';
    is_compound: boolean;
    is_default: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

// Extras types
export interface ExtrasGroup {
    id: number;
    user_id: number;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface ExtrasItem {
    id: number;
    user_id: number;
    extras_group_id: number;
    name: string;
    description?: string;
    price: number;
    price_type: 'fixed' | 'per_person' | 'per_night' | 'per_hour';
    max_quantity?: number;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

    // Relationships
    group?: ExtrasGroup;
    taxes?: Tax[];
}

// Reservation types
export type ReservationStatus = 'draft' | 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled' | 'no_show';

export interface Reservation {
    id: number;
    reservation_number: string;
    customer_id: number;
    user_id?: number;
    service_id: number;
    price_id?: number;
    applied_taxes?: AppliedTaxes;
    start_datetime: string;
    end_datetime: string;
    timezone: string;
    guests_count: number;
    units_reserved: number;
    status: ReservationStatus;
    cancellation_reason?: string;
    source: 'website' | 'phone' | 'in_person' | 'partner';
    special_requests?: string;
    internal_notes?: string;
    base_price: number;
    tax_amount: number;
    total_price: number;
    price_breakdown?: PriceBreakdown;
    confirmed_at?: string;
    cancelled_at?: string;
    checked_in_at?: string;
    completed_at?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

    // Relationships
    //   customer?: User;
    service?: Service;
    price?: Price;
    //   user?: User;
    extras?: ReservationExtra[];
}

export interface ReservationExtra {
    id: number;
    reservation_id: number;
    extras_item_id: number;
    applied_taxes?: AppliedTaxes;
    quantity: number;
    unit_price: number;
    total_price: number;
    price_breakdown?: PriceBreakdown;
    created_at: string;
    updated_at: string;

    // Relationships
    extras_item?: ExtrasItem;
}

// Complex types
export interface AppliedTaxes {
    taxes: Array<{
        tax_id: number;
        name: string;
        rate: number;
        type: 'percentage' | 'fixed';
        is_compound: boolean;
        amount: number;
    }>;
    total_tax_amount?: number;
}

export interface PriceBreakdown {
    service?: {
        base: number;
        taxes: number;
        calculation: string;
    };
    extras?: Array<{
        item: string;
        quantity: number;
        unit_price: number;
        total: number;
    }>;
}

// Filter types
export interface ServiceFilters {
    search?: string;
    type?: string;
    is_active?: boolean;
    per_page?: number;
}

// Form types
export interface ServiceFormData {
    name: string;
    category_id?: number;
    description?: string;
    max_capacity: number;
    features?: string[];
    is_active: boolean;
    prices?: PriceFormData[];
    taxes?: number[]; // tax IDs
    extras_groups?: number[]; // extras group IDs
}

export type PriceType = 'fixed' | 'hourly' | 'daily' | 'per_person';

export interface PriceFormData {
    name: string;
    amount: number;
    type: PriceType;
    is_default: boolean;
    is_active: boolean;
}

export interface ReservationFormData {
    customer_id: number;
    service_id: number;
    price_id?: number;
    start_datetime: string;
    end_datetime: string;
    guests_count: number;
    special_requests?: string;
    applied_tax_ids?: number[]; // For backend booking
    extras?: Array<{
        extras_item_id: number;
        quantity: number;
        applied_tax_ids?: number[];
    }>;
}
