import Image from 'next/image';
import Router from 'next/router';
import { useAuth } from '@src/services/AuthContext';
import { useState } from 'react';

const LoginPopUp = () => {
  const { showLoginPopUp, setShowLoginPopUp } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const closeLoginPopUp = () => {
    setShowLoginPopUp(false);
  }

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
        localStorage.setItem('session', JSON.stringify(data));
        Router.push('/')
        closeLoginPopUp();
      } else {
        console.error('Login failed');
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      { showLoginPopUp && (
        <div className='w-screen h-[100%] flex justify-center'>
          <div className='w-screen h-[100%] rounded-[20px] bg-transparent absolute top-[0px] z-[500] flex justify-center md:w-[468px]'>
            <div className='absolute inset-0 bg-black opacity-50' onClick={closeLoginPopUp}></div>
            <div className='top-[50%] translate-y-[-50%] absolute w-[85%] px-[20px] py-[20px] rounded-[20px] bg-white md:w-[309px]'>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex flex-row mb-[25px]'>
                  <button className="absolute left-0 ml-[17px]" onClick={closeLoginPopUp}>
                    <img className=" rounded-full hover:brightness-110 hover:shadow-lg" src="images/back.svg" alt="back" width={39} height={39}/>
                  </button>
                  <h1 className='text-[24px] mt-[3px] font-bold font-montserrat'>Login</h1>
                </div>
                <div className="flex flex-col space-y-3 w-[100%] items-center justify-center">
                  <input type="email" className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#D9D9D9] rounded-[20px] text-black text-[14px]' placeholder='Email' value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#D9D9D9] rounded-[20px] text-black text-[14px]' placeholder='Password' value={password}
                        onChange={(e) => setPassword(e.target.value)}  />
                  <button className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#0078C9] rounded-[20px] text-white font-bold text-[14px]' onClick={handleLogin}>
                    <div className='flex justify-center gap-[9px]'>
                      {/* <Image alt="iconLogin" src="images/iconITB.svg" width={20} height={20}  /> */}
                      {/* ITB Account/SSO Login */}
                      Login
                    </div>
                  </button>
                  <button className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#00AFF7] rounded-[20px] text-white font-bold text-[14px]' >
                    <div className='flex justify-center gap-[9px]'>
                      {/* <Image alt="iconLogin" src="images/iconGoogle.svg" width={20} height={20}  /> */}
                      Lanjutkan Dengan Google
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
  
export default LoginPopUp;
  