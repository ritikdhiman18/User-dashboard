// src/components/ProtectedRoute.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';

const mockStore = configureStore([]);
let store: any;

describe('ProtectedRoute Component', () => {
    test('redirects to signin when not authenticated', () => {
        store = mockStore({
            auth: { isAuthenticated: false },
        });

        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Routes>
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/signin" element={<div>Sign In Page</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Sign In Page')).toBeInTheDocument();
    });

    test('renders the dashboard when authenticated', () => {
        store = mockStore({
            auth: { isAuthenticated: true },
        });

        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <Routes>
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Dashboard Content')).toBeInTheDocument();
    });
});
