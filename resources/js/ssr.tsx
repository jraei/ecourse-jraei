
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import createServer from '@inertiajs/react/server';
import { hydrateRoot } from 'react-dom/client';
import route from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: hydrateRoot,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        setup: ({ el, App, props }) => {
            // Make route function available globally for SSR
            if (typeof window !== 'undefined') {
                window.route = route;
            }
            
            hydrateRoot(el, <App {...props} />);
        },
    }),
);
