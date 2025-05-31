
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    flash: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: {
        success?: string;
        error?: string;
    };
};

export interface Course {
    id: number;
    name: string;
    slug: string;
    description?: string;
    thumbnail?: string;
    order?: number;
    status: string;
    module_count?: number;
    completion_percentage?: number;
    created_at: string;
    updated_at: string;
    modules?: Module[];
}

export interface Module {
    id: number;
    name: string;
    slug?: string;
    video_path?: string;
    order?: number;
    status: string;
    course_id: number;
    created_at: string;
    updated_at: string;
    is_completed?: boolean;
    duration?: string;
}
