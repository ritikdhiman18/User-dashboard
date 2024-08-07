import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);

describe('App Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            auth: { isAuthenticated: false },
        });
    });

    test('renders Sign In page by default', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Sign In')).toBeInTheDocument();
    });

    test('renders Sign Up page on /signup route', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/signup']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Sign Up')).toBeInTheDocument();
    });

    test('redirects to Sign In page when trying to access protected route', () => {
        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Sign In')).toBeInTheDocument();
    });

    test('renders Dashboard page when authenticated', () => {
        store = mockStore({
            auth: { isAuthenticated: true },
        });

        const { getByText } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/dashboard']}>
                    <App />
                </MemoryRouter>
            </Provider>
        );

        expect(getByText('Dashboard Content')).toBeInTheDocument();
    });
});
