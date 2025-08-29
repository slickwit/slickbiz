// Base types
export type PriceType = 'fixed' | 'hourly' | 'daily' | 'per_person';
export type ReservationStatus = 'draft' | 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled' | 'no_show';
export type PriceTypeConditional = 'hourly' | 'daily';
export type ExtraPriceType = 'fixed' | 'per_person' | 'per_night' | 'per_hour';

// Tax related types
export interface Tax {
    id: number;
    user_id: number;
    name: string;
    description?: string;
    rate: number;
    type: 'percentage' | 'fixed';
    is_default: boolean;
    is_compound: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}

export interface AppliedTax {
    tax_id: number;
    name: string;
    rate: number;
    type: 'percentage' | 'fixed';
    is_compound: boolean;
    amount: number;
}

export interface AppliedTaxes {
    taxes: AppliedTax[];
    total_tax_amount: number;
}

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

// Price types
export interface Price {
    id: number;
    user_id: number;
    service_id: number;
    amount: number;
    type: PriceType;
    duration?: number; // Duration in hours for hourly, days for daily
    buffer_time_before?: number; // Buffer in minutes before booking
    buffer_time_after?: number; // Buffer in minutes after booking
}

export interface ConditionalPricing {
    id: number;
    service_id: number;
    duration: number; // Duration in hours for hourly, days for daily
    type: PriceTypeConditional;
    amount: number;
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
    items?: ExtrasItem[];
}

export interface ExtrasItem {
    id: number;
    user_id: number;
    extras_group_id: number;
    name: string;
    description?: string;
    price: number;
    price_type: ExtraPriceType;
    max_quantity?: number;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    taxes?: Tax[];
}

export interface ServiceExtras {
    service_id: number;
    extras_group_id: number;
    is_required: boolean;
    max_selectable?: number;
    created_at: string;
    updated_at: string;
    group?: ExtrasGroup;
}

export interface ReservationExtra {
    id: number;
    reservation_id: number;
    extras_item_id: number;
    applied_taxes?: AppliedTaxes;
    quantity: number;
    unit_price: number;
    total_price: number;
    price_breakdown?: Record<string, string>;
    created_at: string;
    updated_at: string;
    item?: ExtrasItem;
}

// Service types
export interface Service {
    id: number;
    user_id: number;
    category_id?: number;
    name: string;
    slug: string;
    description?: string;
    min_capacity: number;
    max_capacity: number;
    features?: string[]; // JSON data
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

    // counts
    reservations_count?: number;
    upcoming_reservations_count?: number;
    completed_reservations_count?: number;
    cancelled_reservations_count?: number;

    // Relationships
    category?: Category;
    price?: Price;
    conditional_pricings?: ConditionalPricing[];
    taxes?: Tax[];
    extras_groups?: ServiceExtras[];
}

// Reservation types
export interface Reservation {
    id: number;
    reservation_number: string;
    customer_id: number;
    service_id: number;
    user_id?: number;
    start_datetime: string;
    end_datetime: string;
    timezone: string;
    guests_count: number;
    units_reserved: number;
    status: ReservationStatus;
    cancellation_reason?: string;
    source: string;
    special_requests?: string;
    internal_notes?: string;
    price_id?: number;
    applied_taxes?: AppliedTaxes;
    base_price: number;
    tax_amount: number;
    total_price: number;
    price_breakdown?: Record<string, string>;
    confirmed_at?: string;
    cancelled_at?: string;
    checked_in_at?: string;
    completed_at?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;

    // Relationships
    service?: Service;
    // customer?: any; // User type would be defined elsewhere
    // user?: any; // User type would be defined elsewhere
    price?: Price;
    extras?: ReservationExtra[];
}

// Form types for creating/updating
export interface ServiceFormData {
    name: string;
    category_id?: number;
    description?: string;
    min_capacity: number;
    max_capacity: number;
    features?: string[];
    is_active: boolean;
    prices?: Price[];
    conditional_pricings?: ConditionalPricing[];
    tax_ids?: number[];
    extras_groups?: ServiceExtras[];
}

export interface PriceFormData {
    service_id: number;
    amount: number;
    type: PriceType;
    duration?: number;
    buffer_time_before?: number;
    buffer_time_after?: number;
}

export interface ConditionalPricingFormData {
    service_id: number;
    duration: number;
    type: PriceTypeConditional;
    amount: number;
}
