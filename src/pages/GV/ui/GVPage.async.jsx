import { lazy } from 'react';

// export const GVPageAsync = lazy(() => import('./GVPage'));
export const GVPageAsync = lazy(
	() =>
		new Promise(resolve => {
			setTimeout(() => resolve(import('./GVPage')), 700);
		}),
);
