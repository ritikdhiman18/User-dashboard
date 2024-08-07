import axios from 'axios';

export const http = axios.create({
    baseURL: 'https://reqres.in/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface AuthResponse {
    token: string;
}

export const login = (email: string, password: string) => {
    return http.post<AuthResponse>('/login', { email, password });
};

export const register = (email: string, password: string) => {
    return http.post<AuthResponse>('/register', { email, password });
};
