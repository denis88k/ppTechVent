import { GVPage } from 'pages/GV';
import { MixerPage } from 'pages/Mixer';

export const AppRoutes = {
	GV: 'gv',
	MIXER: 'mixer',
};

export const RoutePath = {
	[AppRoutes.GV]: '/',
	[AppRoutes.MIXER]: '/mixer',
};

export const routeConfig = {
	[AppRoutes.GV]: {
		path: RoutePath.gv,
		element: <GVPage />,
	},
	[AppRoutes.MIXER]: {
		path: RoutePath.mixer,
		element: <MixerPage />,
	},
};
