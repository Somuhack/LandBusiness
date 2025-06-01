import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../utils/api';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;
        if (!email || !password) return toast.error('All fields are required');

        try {
            const res = await loginUser(formData);
            if (res.status === 200){
                toast.success('Login successful');
                localStorage.setItem('userToken', res.data.token);
                navigate('/home');
              
            }else{
                toast.error(res.data.msg);
            }

        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Login failed');
        }
    };
    const ForgotPassword = () => {
        navigate('/forgot-password');
    };
    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light ">
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '420px' }}>
                <h3 className="text-center mb-4 text-primary">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <p className="mb-1">
                        Don't have an account?{' '}
                        <Link to="/registration" className="text-decoration-none fw-semibold text-success">
                            Register
                        </Link>
                    </p>
                    <p>
                        <Link to="/forgot-password" className="text-decoration-none text-danger">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
