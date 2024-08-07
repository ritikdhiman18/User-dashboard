import { Middleware } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Store';

const authMiddleware: Middleware<{}, RootState> = store => next => action => {
    const navigate = useNavigate();
    if (action.type !== 'auth/setUser' && !store.getState().auth.user) {
        navigate('/signin');
    }
    return next(action);
};

export default authMiddleware;
