import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../Slices/authSlice';
import { RootState } from '../Store/index';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.auth.error);
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(register(email, password));
        navigate("/dashboard");
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md">
                <h2 className="mb-4 text-xl">Sign Up</h2>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <div className="mb-2">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white">Sign Up</button>
                <a href='/signin' className='text-blue-500'>For signin</a>
            </form>
        </div>
    );
};

export default SignUp;
