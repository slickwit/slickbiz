//

// ----------------------------------------------------------------------

export interface Service {
    id: number;
    name: string;
    type: string;
    category_id?: number;
    description: string | null;
    max_capacity: number;
    images: string[] | null;
    features: string[] | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;

    // Relationships
    category?: Category;
    active_price?: Price;
    upcoming_reservations_count?: number;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Price {
    id: number;
    service_id: number;
    type: 'fixed' | 'hourly' | 'daily' | 'per_person';
    amount: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Tax {
    id: string;
    name: string;
    rate: number;
    type: string;
    is_compound: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface ExtrasGroup {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

// For the index page response
export interface ServicesIndexResponse {
    data: Service[];
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number;
    to: number;
    links: PaginationLink[];
    path: string;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

// Form data types
export interface ServiceFormData {
    name: string;
    type: string;
    description?: string;
    max_capacity: number;
    images?: string[];
    features?: string[];
    is_active: boolean;
}

export interface PriceFormData {
    service_id: string;
    amount: number;
    min_amount?: number;
    max_amount?: number;
    min_quantity: number;
    max_quantity?: number;
    valid_from?: string;
    valid_until?: string;
    is_active: boolean;
}

// Filter types
export interface ServiceFilters {
    search?: string;
    type?: string;
    is_active?: boolean;
    per_page?: number;
}
