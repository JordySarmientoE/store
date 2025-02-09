import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserServices } from '../services';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const ProtectedRoute = ({ element }) => {
  const [isValid, setIsValid] = useState(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const checkToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const user = await UserServices.GetInfo(token);
        localStorage.setItem('token', user.token);
        dispatch(login(user));
        setIsValid(true);
      } else {
        setIsValid(false);
        localStorage.clear();
        navigator('/sign-in');
      }
    } catch (error) {
      setIsValid(false);
      localStorage.clear();
      navigator('/sign-in');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  return isValid ? element : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
