import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api';  // Adjust the path to your api file
import 'react-toastify/dist/ReactToastify.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  farmerType: yup.string().oneOf(['Urban', 'Rural'], 'Select a valid Farmer Type').required('Farmer Type is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Registration = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
   const { confirmPassword: _confirmPassword, ...postData } = data;

    try {
      await registerUser(postData);  // Your API call
      
      toast.success('Registration successful! Redirecting to login...');
      reset();

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Axios errors might be in error.response.data.message or just error.message
      const errMsg = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(errMsg);
    }
  };

  return (
    <div className="container mt-5 card shadow-lg p-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center text-primary">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name')}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="farmerType" className="form-label">Farmer Type</label>
          <select
            id="farmerType"
            className={`form-select ${errors.farmerType ? 'is-invalid' : ''}`}
            {...register('farmerType')}
            defaultValue=""
          >
            <option value="" disabled>Select Farmer Type</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
          <div className="invalid-feedback">{errors.farmerType?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email')}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            {...register('confirmPassword')}
          />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
        </div>

      <div className='d-flex flex-column align-items-center'>
          <button type="submit" className="btn btn-primary w-25">Register</button>
          <p >If you have Account? <NavLink style={{ textDecoration: 'none', color: 'blue' , fontWeight: 'bold', fontSize: '16px',marginLeft: '5px'}} to="/login">Login</NavLink></p>
      </div>
      </form>
     
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Registration;
