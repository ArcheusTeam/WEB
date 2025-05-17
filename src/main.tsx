import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from '../routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { Loader } from '@/components/loader';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Élément avec l\'ID "root" non trouvé dans le DOM.');
}

createRoot(rootElement).render(
    <StrictMode>
        {/*<Suspense fallback={<Loader />}>
            *<Route path="/home" element={<LandingPage />} />
        </Suspense>*/}
        <Suspense fallback={<div className="flex items-center justify-center h-screen">Chargement...</div>}>
            <RouterProvider router={routes} />
            {/* Pour utiliser le générateur, décommentez la ligne ci-dessous et commentez LandingPage */}
            {/* <Generator /> */}
        </Suspense>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </StrictMode>
);
