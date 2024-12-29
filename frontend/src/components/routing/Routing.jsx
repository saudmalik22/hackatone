import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from '../../pages/login/Login';
import { SignUp } from '../../pages/signup/SignUp';
import { Home } from '../../pages/home/Home';
import AddEvent from '../../pages/addEvent/AddEvent';


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
    {
        path:"/addEvent",
        element:<AddEvent/>
    }
]);

export const Routing=()=> {
    return <RouterProvider router={router} />;
}

