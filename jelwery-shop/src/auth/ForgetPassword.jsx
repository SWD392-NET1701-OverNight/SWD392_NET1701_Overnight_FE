import React, { useState } from 'react'
import Input from '../component/ui/Input'
import { sendHttp } from '../utils/send-http'
import authAPI from '../feature/auth/authApi'
import { Link } from 'react-router-dom';

function ForgetPassword() {
  const [isVisible, setIsVisible] = useState(false);
 
  const toggleVisibility = () => setIsVisible(!isVisible);

  async function handleSubmit(e){
    e.preventDefault(); 
    try {  
      if(!isVisible){
        const data = Object.fromEntries(new FormData(e.target))
        console.log(data);   
        const check = await sendHttp(authAPI.confirmEmail, data.email);
        console.log(check.data);
        if (check.status === 'success') {
          toggleVisibility();       
        }
      }else{
        const data = Object.fromEntries(new FormData(e.target))
        console.log(data);   
        const check = await sendHttp(authAPI.resetPassword, data);
      }
      
    } catch (error) {
      console.error('Error confirming email:', error);
    }
  };
  const handleResetPassword = (e) => {
     const data = Object.fromEntries(new FormData(e.target))
     console.log(data);
    console.log('Resetting password');
  };
  
  return (
    <div>
      <h1>FORGOT YOUR PASSWORD</h1>
      <h3>Enter the email you used to join</h3>
      <form className="mt-10 flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input label="Email" id="email" type="email" />
        {isVisible && (
          <>
           <Input label="OTP" id="OTP" type="phoneNum" />
           <Input label="New Password" id="password" type="password" />
          </>        
        )}
  
        <div>
       
           <button className="btn mt-4 bg-primary text-white hover:opacity-70 active:opacity-100" type="submit">
              {!isVisible == true ? "Send reset OTP": "Reset Password"} 
         </button>   
       
            {/* {isVisible && (
           <button className="btn mt-4 bg-blue-500 text-white hover:opacity-70 active:opacity-100" >
           Reset Password
         </button>
        )} */}
           
        
        </div>
      </form>
      {isVisible && (
          <p className="p-link mt-2">
          Back To
          <Link to=".." className="ml-2 underline">
          Login
          </Link>
        </p>      
        )}
    </div>
  );
          }  

export default ForgetPassword
