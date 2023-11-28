import React, { useState } from 'react';
import Image from 'next/image';

interface LoginWarningProps {
  isOpen: boolean;
  onClose: () => void;
  isFromLoginButton: boolean;
}

const LoginWarning: React.FC<LoginWarningProps> = ({ isOpen, onClose, isFromLoginButton }) => {
  if (!isOpen) {
    return null; // If isOpen is false, don't render anything
  }

  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password  }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data:', JSON.stringify(data));
        await localStorage.setItem('session', JSON.stringify(data));; 
        onClose();
      } else {
        console.error('Login failed');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-screen h-[100%] flex justify-center'>
      <div className='w-screen h-[100%] rounded-[20px] bg-transparent absolute top-[0px] z-[500] flex justify-center md:w-[468px]'>
        <div className='absolute inset-0 bg-black opacity-50' onClick={onClose}></div>
        <div className='top-[50%] translate-y-[-50%] absolute w-[85%] px-[20px] py-[20px] rounded-[20px] bg-white md:w-[309px]'>
          { isLogin || isFromLoginButton ? (
            <>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-row mb-[25px]'>
                  <button className="absolute left-0 ml-[17px]" onClick={onClose}>
                    <img className=" rounded-full hover:brightness-110 hover:shadow-lg" src="images/back.svg" alt="back" width={39} height={39}/>
                  </button>
                  <h1 className='text-[24px] mt-[3px] font-bold font-montserrat'>Login</h1>
                </div>
                <input type="email" className='w-[90%] mb-[6px] h-[39px] px-[20px] py-[10px] bg-[#D9D9D9] rounded-[20px] text-black mt-[6px] text-[14px]' placeholder='Email' value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className='w-[90%] mb-[6px] h-[39px] px-[20px] py-[10px] bg-[#D9D9D9] rounded-[20px] text-black mt-[6px] text-[14px]' placeholder='Password' value={password}
                      onChange={(e) => setPassword(e.target.value)}  />
                <button onClick={()=> handleLogin()} className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#0078C9] rounded-[20px] text-white mt-[6px] font-bold text-[14px]'>
                  <div className='flex justify-center gap-[9px]'>
                    {/* <Image alt="iconLogin" src="images/iconITB.svg" width={20} height={20}  /> */}
                    {/* ITB Account/SSO Login */}
                    Login
                  </div>
                </button>
                <button className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#00AFF7] rounded-[20px] text-white mt-[10px] font-bold text-[14px]'>
                  <div className='flex justify-center gap-[9px]'>
                    {/* <Image alt="iconLogin" src="images/iconGoogle.svg" width={20} height={20}  /> */}
                    Lanjutkan Dengan Google
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className='w-[100%] flex justify-end'>
                <Image
                  src="/images/close.svg"
                  alt='close-button'
                  width={18}
                  height={18}
                  onClick={onClose}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <div className='flex justify-center'>
                <p className='font-medium text-[16px]'>Perhatian!</p>
              </div>
              <div className='flex justify-center text-[14px] w-[40%] mx-auto my-2 text-center md:w-[70%]'>
                <p className='font-normal'>Kamu perlu log in untuk menggunakan fitur ini 👉👈</p>
              </div>
              <button className='flex justify-center w-[128px] h-[39px] px-[20px] py-[10px] mx-auto bg-[#0078C9] rounded-[20px] text-white mt-[21px] font-bold text-[14px]' onClick={() => setIsLogin(true)}>
                <div className='flex justify-center gap-[9px] mt-[-1px]'>
                  <Image alt="iconLogin" src="images/iconLogin.svg" width={20} height={20}  />
                  Log In
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginWarning;
