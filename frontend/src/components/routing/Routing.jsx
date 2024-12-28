import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from '../../pages/login/Login';
import { SignUp } from '../../pages/signup/SignUp';
import { Home } from '../../pages/home/Home';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element:<Login /> ,
    },
    {
        path: '/signup',
        element:<SignUp/>,
    },
]);

export const Routing=()=> {
    return <RouterProvider router={router} />;
}

