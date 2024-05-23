import React from 'react';
import Input from './components/Input';
import { Link } from 'react-router-dom';

function Login() {
  function handleSubmit(e) {
    e.preventDefault();
    const data = { username: e.target.txtUsername.value, password: e.target.txtPassword.value };
    console.log(data);
  }
  return (
    <div className="px-10 pt-14">
      <h1 className="text-heading text-2xl font-bold">Sign Up Page</h1>
      <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
        <Input label="Username" id="txtUsername" type="text" />
        <Input label="Password" id="txtPassword" type="password" className="mt-4" />
        <Link className="p-link underline text-right mt-2">Forget Password</Link>
        <div>
          <button className="btn bg-primary text-white hover:opacity-70 active:opacity-100">
            Sign In
          </button>
        </div>
        <p className="p-link mt-2">
          Don't have an account ? <Link className="underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
