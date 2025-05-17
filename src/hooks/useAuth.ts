import { useState, useEffect } from "react";
import {
    AuthApi,
    Configuration
} from "generated-client";
import type {
    LoginRequest,
    SignupRequest,
    User
} from "generated-client";

const config = new Configuration({
    accessToken: () => localStorage.getItem("accessToken") || "",
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

            // Stockage du token
            localStorage.setItem("accessToken", response.accessToken ?? "");

            // Récupération du user
            await fetchCurrentUser();

        } catch (err: any) {
            console.error("Login error:", err);
            setError("Échec de la connexion");
        } finally {
            setLoading(false);
        }
    };

    const signup = async (data: SignupRequest) => {
        try {
            setLoading(true);
            setError(null);

            const response = await authApi.signupUser({ signupRequest: data });

            localStorage.setItem("accessToken", response.accessToken ?? "");

            await fetchCurrentUser();
        } catch (err: any) {
            console.error("Signup error:", err);
            setError("Échec de l’inscription");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            setError(null);

            await authApi.logoutUser({
                logoutUserRequest: {
                    refreshToken: "",
                }
            });

            localStorage.removeItem("accessToken");
            setUser(null);
        } catch (err: any) {
            console.error("Logout error:", err);
            setError("Échec de la déconnexion");
        } finally {
            setLoading(false);
        }
    };

    const fetchCurrentUser = async () => {
        try {
            const currentUser = await authApi.getCurrentUser();
            setUser(currentUser);
        } catch (err: any) {
            console.error("Erreur récupération user:", err);
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
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