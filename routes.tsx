import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LandingPage = lazy(() => 
  import('./src/page/landing/Landing').then((m) => ({ default: m.default }))
);

const Generator = lazy(() => 
  import('./src/page/generator/Generator').then((m) => ({ default: m.default }))
);

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/generator',
    element: <Generator />
  }
]); 