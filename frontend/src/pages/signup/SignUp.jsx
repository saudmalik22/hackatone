import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import pic from '../../assets/signup.png';

export const SignUp = () => {
    const [profileImage, setProfileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <div className="flex justify-center ">
                    <div className="h-32 w-32 bg-cover rounded-full" style={{ backgroundImage: `url(${pic})` }}></div>
                </div>
                <div className="text-center text-2xl font-bold text-blue-500 mb-6">Sign Up</div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-left text-gray-700">Profile Image</label>
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <label htmlFor="profileImage" className="cursor-pointer">
                                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                        {profileImage ? (
                                            <img
                                                src={URL.createObjectURL(profileImage)}
                                                alt="Profile Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <FontAwesomeIcon icon={faCamera} className="text-gray-500 text-2xl" />
                                        )}
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-left text-gray-700">Name</label>
                        <input type="text" placeholder="Your username" className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700">EMAIL</label>
                        <input type="email" placeholder="example@test.com" className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700">PASSWORD</label>
                        <input type="password" placeholder="Min 6 characters long" className="w-full px-4 py-2 mt-2 border rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition duration-300">SIGN UP</button>
                </div>
                <div className="flex justify-center items-center mt-4 text-m text-gray-700">
                    <p className='mr-2'>Already have an Account?</p>
                    <a href="#" className="text-blue-500 hover:underline">Login</a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;