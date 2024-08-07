
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignIn from './SignIn';

const mockStore = configureStore([]);
let store: any;

describe('SignIn Component', () => {
    beforeEach(() => {
        store = mockStore({
            auth: { error: null },
        });
    });

    test('renders Sign In form', () => {
        render(
            <Provider store={store}>
                <SignIn />
            </Provider>
        );

        expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    });

    test('displays error message on login failure', () => {
        store = mockStore({
            auth: { error: 'Invalid credentials' },
        });

        render(
            <Provider store={store}>
                <SignIn />
            </Provider>
        );

        expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });

    test('dispatches login action on form submission', () => {
        const mockDispatch = jest.fn();
        store.dispatch = mockDispatch;

        render(
            <Provider store={store}>
                <SignIn />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password' } });
        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));

        expect(mockDispatch).toHaveBeenCalledTimes(1);
    });
});
