import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from "./page/auth/SignIn";
import AdminLayout from "./page/admin/default";
import RtlLayout from "./page/rtl/default";
import './index.css';

const LandingPage = lazy(() =>
    import('@/page/landing/Landing').then((m) => ({ default: m.default }))
);

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Élément avec l\'ID "root" non trouvé dans le DOM.');
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="auth/*" element={<AuthLayout />} />
                <Route path="admin/*" element={<AdminLayout />} />
                <Route path="rtl/*" element={<RtlLayout />} />
                <Route path="/" element={<Navigate to="/admin" replace />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
