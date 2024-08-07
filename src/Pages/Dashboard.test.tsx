
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Dashboard from './Dashboard';

const mockStore = configureStore([]);
let store: any;

describe('Dashboard Component', () => {
    beforeEach(() => {
        store = mockStore({
            auth: { isAuthenticated: true },
        });
    });

    test('renders Dashboard content', () => {
        render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );

        expect(screen.getByText(/Dashboard Content/i)).toBeInTheDocument();
    });
});
