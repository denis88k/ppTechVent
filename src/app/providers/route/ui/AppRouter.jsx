import { Suspense, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import cls from './AppRouter.module.scss';

export const AppRouter = memo(() => {
	return (
		<div className={cls.AppRouter}>
			<div className='container'>
				<div className={cls.AppRouter__inner}>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							{Object.values(routeConfig).map(({ path, element }) => (
								<Route
									key={path}
									path={path}
									element={element}
								/>
							))}
						</Routes>
					</Suspense>
				</div>
			</div>
		</div>
	);
});
