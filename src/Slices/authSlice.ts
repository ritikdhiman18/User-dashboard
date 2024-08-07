// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../Store/index';
import { login as loginService, register as registerService } from '../services/axiosConfig';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.token = action.payload;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.token = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.error = null;
        },
    },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await loginService(email, password);
        dispatch(loginSuccess(response.data.token));
    } catch (error: any) {
        dispatch(loginFailure(error.response.data.error));
    }
};

export const register = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await registerService(email, password);
        dispatch(loginSuccess(response.data.token));
    } catch (error: any) {
        dispatch(loginFailure(error.response.data.error));
    }
};

export default authSlice.reducer;
