import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './index.css';
import { Loader } from '@/components';
import PaymentPage from "@/page/pricing/PaiementPage.tsx";
import { PrivateRoute } from "@/page/routes/PrivateRoutes.tsx";
import Profiles from './page/profile';
import Generator from './page/generator/Generator';
const LandingPage = lazy(() => import('@/page/landing/Landing'));
const LoginPage = lazy(() =>
  import('@/page/auth/AuthPage').then((m) => ({ default: m.AuthPage }))
);
const AdminPage = lazy(() =>
  import('@/page/admin/page').then((m) => ({ default: m.Admin }))
);
const rootElement = document.getElementById('root');
if (!rootElement)
  throw new Error('Élément avec l\'ID "root" non trouvé dans le DOM.');

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          {/*<Route
              path="/admin"
              element={
                <PrivateRoute requiredRole="admin">
                  <AdminPage />
                </PrivateRoute>
              }
          />*/}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<Profiles />} />
          <Route path="/generator" element={<Generator />} />
        </Routes>
      </Suspense>
    </Router>
  </StrictMode>
);
