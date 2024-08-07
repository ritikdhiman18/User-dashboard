// src/pages/SignUp.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignUp from './SignUp';

const mockStore = configureStore([]);
let store: any;

describe('SignUp Component', () => {
    beforeEach(() => {
        store = mockStore({
            auth: { error: null },
        });
    });

    test('renders Sign Up form', () => {
        render(
            <Provider store={store}>
                <SignUp />
            </Provider>
        );

        expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    });

    test('displays error message on registration failure', () => {
        store = mockStore({
            auth: { error: 'Registration failed' },
        });

        render(
            <Provider store={store}>
                <SignUp />
            </Provider>
        );

        expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
    });

    test('dispatches register action on form submission', () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        render(
            <Provider store={store}>
                <SignUp />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});
