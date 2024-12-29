import {useState} from 'react';
import {useDispatch} from 'react-redux';
import pic from '../../assets/signup.png';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/slices/userSlice';

export const SignUp = () => {
   const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      const dispatch = useDispatch();
      const navigate = useNavigate();
    const handleSubmit =async () => {
      
       await  dispatch(register({name, email, password}));
       
      navigate('/');
    }
    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <div className="flex justify-center ">
                    <div className="h-32 w-32 bg-cover rounded-full" style={{ backgroundImage: `url(${pic})` }}></div>
                </div>
                <div className="text-center text-2xl font-bold text-blue-500 mb-6">Sign Up</div>
                <div className="space-y-4">      
                    <div>
                        <label className="block text-left text-gray-700">Name</label>
                        <input type="text"  onChange={(e)=>setName(e.target.value)} placeholder="Your username" className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700">EMAIL</label>
                        <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="example@test.com" className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700">PASSWORD</label>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Min 8 characters long" className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" onClick={handleSubmit} className="w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition duration-300">SIGN UP</button>
                </div>
                <div className="flex justify-center items-center mt-4 text-m text-gray-700">
                    <p className='mr-2'>Already have an Account?</p>
                    <a href="#" className="text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
};

