

export const authService = {
    setToken(token: string) {
        localStorage.setItem('jwt_token', token);
    },

    getToken(): string | null {
        return localStorage.getItem('jwt_token');
    },

    removeToken() {
        localStorage.removeItem('jwt_token');
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};