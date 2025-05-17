import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import {Loader} from "@/components";

const LandingPage = lazy(() => import('@/page/landing/Landing'));
const LoginPage =lazy(() =>
    import('@/page/auth/AuthPage').then((m) => ({ default: m.AuthPage }))
);
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Élément avec l\'ID "root" non trouvé dans le DOM.');

createRoot(rootElement).render(
    <StrictMode>
        <Router>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </Router>
    </StrictMode>
);