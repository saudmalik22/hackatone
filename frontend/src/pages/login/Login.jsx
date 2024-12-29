import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/userSlice';
import pic from '../../assets/login.png';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitLogin = async () => {
        try {
            if (!email || !password) {
                alert("Email and password are required");
                return;
            }

            const result = await dispatch(login({ email, password }));
            
            if (login.fulfilled.match(result)) {
                // Navigate to home on successful login
                navigate('/');
            } else {
                alert(result.payload || 'Login failed');
            }
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-10 rounded-2xl shadow-lg w-96">
                    <div className="flex justify-center mb-4">
                        <div
                            className="h-24 w-24 bg-cover rounded-full"
                            style={{ backgroundImage: `url(${pic})` }}
                        ></div>
                    </div>
                    <div className="text-center text-2xl font-bold text-blue-500 mb-6">Login</div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-left text-gray-700">EMAIL</label>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                placeholder="example@test.com"
                                className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-700">PASSWORD</label>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Min 6 characters long"
                                className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={handleSubmitLogin}
                            className="w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                        >
                            LOGIN
                        </button>
                    </div>
                    <div className="flex justify-center items-center mt-4 text-m text-gray-700">
                        <p className="mr-2 items-center">Register an Account?</p>
                        <a href="#" className="text-blue-500 hover:underline">Signup</a>
                    </div>
                </div>
            </div>
        </>
    );
};
