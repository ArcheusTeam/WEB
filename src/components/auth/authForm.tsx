import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.ts';

interface AuthField {
  name: 'email' | 'password' | 'username' | 'confirmPassword';
  label: string;
  type: string;
  placeholder: string;
}

interface AuthFormProps {
  fields: AuthField[];
  buttonText: string;
  buttonColor: string;
  redirectTo?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
                                                    fields,
                                                    buttonText,
                                                    buttonColor,
                                                    redirectTo = '/dashboard',
                                                  }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login, signup, loading, error, user, isAuthenticated } = useAuth();

  // Redirect if already authenticated when component mounts
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setLocalError(null);

    if (
        formData.password &&
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
    ) {
      setLocalError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      let authResponse;
      if (formData.username) {
        // Signup flow
        authResponse = await signup({
          email: formData.email,
          password: formData.password,
          username: formData.username,
        });
        setSuccessMessage('Inscription réussie ! Redirection...');
      } else {
        // Login flow
        authResponse = await login({
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });
        setSuccessMessage('Connexion réussie ! Redirection...');
      }

      const userRole = authResponse?.user?.role;
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }, 1000);
    } catch (err) {
    }
  };

  // If already authenticated, don't render the form (optional, since useEffect redirects)
  if (isAuthenticated && user) {
    return null;
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
            <div key={field.name}>
              <label
                  htmlFor={field.name}
                  className="block mb-1 text-sm font-medium text-white"
              >
                {field.label}
              </label>
              <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
        ))}
        {(localError || error) && (
            <p className="text-red-500 text-sm">{localError || error}</p>
        )}
        {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
        )}
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 ${buttonColor} hover:opacity-90 text-white font-semibold rounded transition`}
        >
          {loading ? 'Chargement...' : buttonText}
        </button>
      </form>
  );
};