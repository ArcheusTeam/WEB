import { useState, useEffect } from 'react';
import { AuthApi, Configuration } from 'generated-client';
import type { LoginRequest, SignupRequest, User } from 'generated-client';

const config = new Configuration({
  basePath: 'https://api.archeusteam.madagascar.webcup.hodi.host',
  accessToken: () => localStorage.getItem('accessToken') || '',
});
const authApi = new AuthApi(config);

function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = async (data: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.loginUser({ loginRequest: data });

      localStorage.setItem('accessToken', response.accessToken ?? '');
      localStorage.setItem('refreshToken', response.refreshToken ?? '');

      await fetchCurrentUser();
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Échec de la connexion');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignupRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authApi.signupUser({ signupRequest: data });

      localStorage.setItem('accessToken', response.accessToken ?? '');
      localStorage.setItem('refreshToken', response.refreshToken ?? '');

      await fetchCurrentUser();
    } catch (err: any) {
      console.error('Signup error:', err);
      setError('Échec de l’inscription');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      const refreshToken = localStorage.getItem('refreshToken') || '';
      await authApi.logoutUser({
        refreshTokenRequest: { refreshToken },
      });

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError('Échec de la déconnexion');
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No access token found');
      }
      const currentUser = await authApi.getCurrentUser();
      setUser(currentUser);
    } catch (err: any) {
      console.error('Erreur récupération user:', err.message || err);
      setUser(null);
      setError('Échec de la récupération de l’utilisateur');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchCurrentUser();
    }
  }, []);

  return {
    login,
    signup,
    logout,
    loading,
    error,
    user,
    isAuthenticated: !!user,
    refreshUser: fetchCurrentUser,
  };
}

export { useAuth };