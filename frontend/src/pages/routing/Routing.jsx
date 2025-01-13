import {  Route, Routes } from 'react-router-dom';

import { Login } from '../login/Login';
import { SignUp } from '../signup/SignUp';
import { Home } from '../home/Home';
import AddEvent from '../addEvent/AddEvent';
import Layout from '../../components/layout/Layout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import PublicRoute from './publicRoute/PublicRoute';
import SingleEvent from '../singleEvent/SingleEvent';
import Update from '../updateEvent/Update';




export const Routing=()=> {
    return (
        <Routes>
        <Route path="/" element={
            <ProtectedRoute>
            <Layout>
            <Home/>
            </Layout>
            </ProtectedRoute>
           
            }/>
            <Route path="/login" element={
                <PublicRoute>
                <Login/>
                </PublicRoute>
                }/>
                <Route path="/signup" element={
                    <PublicRoute>
                        <SignUp/>
                    </PublicRoute>
                    }/>
                    <Route path="/addEvent" element={
                        <ProtectedRoute>
                        <Layout>
                        <AddEvent/>
                        </Layout>
                        </ProtectedRoute>
                        }/>
                        <Route path="/singleEvent/:eventID" element={
                        <ProtectedRoute>
                        <Layout>
                        <SingleEvent/>
                        </Layout>
                        </ProtectedRoute>
                        }/>
                        <Route path='/updateEvent/:id' element={
                            <ProtectedRoute>
                                <Layout>
                                    <Update/>
                                </Layout>
                            </ProtectedRoute>
                        }/>

        </Routes>
    )
}

