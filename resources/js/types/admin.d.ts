
export interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'member';
    created_at: string;
}

export interface AdminCourse {
    id: number;
    name: string;
    description?: string;
    status: 'active' | 'inactive';
    order?: number;
    modules_count?: number;
    created_at: string;
}

export interface AdminModule {
    id: number;
    name: string;
    course_id: number;
    course?: {
        id: number;
        name: string;
    };
    video_url?: string;
    status: 'active' | 'inactive';
    order?: number;
    created_at: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}
