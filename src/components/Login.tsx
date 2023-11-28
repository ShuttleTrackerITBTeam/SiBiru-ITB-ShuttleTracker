import Image from 'next/image';

interface LoginProps {
  setIsLogin: (isLogin: boolean) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = (setIsLogin, onClose) => {
    
    return (
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-row mb-[25px]'>
          <button className="absolute left-0 ml-[17px]" onClick={() => {setIsLogin; onClose}}>
            <img className=" rounded-full hover:brightness-110 hover:shadow-lg" src="images/back.svg" alt="back" width={39} height={39}/>
          </button>
          <h1 className='text-[24px] mt-[3px] font-bold font-montserrat'>Login</h1>
        </div>
        <button className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#0078C9] rounded-[20px] text-white mt-[6px] font-bold text-[14px]'>
          <div className='flex justify-center gap-[9px]'>
            {/* <Image alt="iconLogin" src="images/iconITB.svg" width={20} height={20}  /> */}
            ITB Account/SSO Login
          </div>
        </button>
        <button className='w-[90%] h-[39px] px-[20px] py-[10px] bg-[#00AFF7] rounded-[20px] text-white mt-[10px] font-bold text-[14px]' >
          <div className='flex justify-center gap-[9px]'>
            {/* <Image alt="iconLogin" src="images/iconGoogle.svg" width={20} height={20}  /> */}
            Lanjutkan Dengan Google
          </div>
        </button>
      </div>
    );
  };
  
  export default Login;
  