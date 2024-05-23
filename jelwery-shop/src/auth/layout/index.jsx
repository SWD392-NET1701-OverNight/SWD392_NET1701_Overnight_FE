import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <main className="d-flex flex w-full h-screen">
      <div className="flex-1">
        <img
          src="https://i.pinimg.com/736x/cc/5e/6f/cc5e6f202869201ce6ff13277bc579f7.jpg"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
