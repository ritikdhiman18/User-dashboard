// src/__tests__/authService.test.ts
import { login, register } from '../services/axiosConfig';
import { http } from '../services/axiosConfig';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(http);

describe('authService', () => {
    afterEach(() => {
        mock.reset();
    });

    it('should log in successfully', async () => {
        mock.onPost('/login').reply(200, { token: '123' });

        const response = await login('test@test.com', 'password');
        expect(response.data.token).toBe('123');
    });

    it('should register successfully', async () => {
        mock.onPost('/register').reply(200, { token: '123' });

        const response = await register('test@test.com', 'password');
        expect(response.data.token).toBe('123');
    });
});
