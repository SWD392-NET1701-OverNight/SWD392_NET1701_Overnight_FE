import React from 'react';
import Input from './components/Input';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axiosClient from '../api/axiosClient';
function Login() {
  const navigate = useNavigate();
  const navState = useNavigation();
  const isLoading = navState.state === 'submitting';
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { username: e.target.txtUsername.value, password: e.target.txtPassword.value };

    try {
      const resData = await axiosClient.post('/api/Users/login', data);
      if (resData) {
        localStorage.setItem('auth-token', resData);
        toast.success('Login success');
        navigate('/');
      }
    } catch (error) {
      toast.error('Login failed');
    }
  }
  return (
    <div className="px-10 pt-14">
      <h1 className="text-heading text-2xl font-bold">Sign Up Page</h1>
      <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
        <Input label="Username" id="txtUsername" type="text" />
        <Input label="Password" id="txtPassword" type="password" className="mt-4" />
        <Link className="p-link underline text-right mt-2">Forget Password</Link>
        <div>
          <button
            className="btn bg-primary text-white hover:opacity-70 active:opacity-100"
            disabled={isLoading}
          >
            Sign In
          </button>
        </div>
        <p className="p-link mt-2">
          Don't have an account ? <Link className="underline">Sign Up</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
