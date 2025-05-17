import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import { Loader } from '@/components/loader';

const LandingPage = lazy(() =>
    import('@/page/landing/Landing').then((m) => ({ default: m.default }))
);

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Élément avec l\'ID "root" non trouvé dans le DOM.');
}

createRoot(rootElement).render(
    <StrictMode>
        {/*<Suspense fallback={<Loader />}>
            *<Route path="/home" element={<LandingPage />} />
        </Suspense>*/}
        {/* <LandingPage /> */}
    </StrictMode>
);
