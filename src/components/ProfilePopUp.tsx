import { useAuth } from '@src/services/AuthContext';
import Image from 'next/image';
import Router from 'next/router';

interface ProfilePopUpProps {
  setIsProfilePopUpOpen: (isOpen: boolean) => void;
}

const ProfilePopUp: React.FC<ProfilePopUpProps> = ({ setIsProfilePopUpOpen }) => {
  const { user, setShowLoginPopUp } = useAuth()

  const handleLoginClick = () => {
    setShowLoginPopUp(true);
    setIsProfilePopUpOpen(false);
  }
  
  const handleLogout = async () => {
    localStorage.removeItem('session');
    Router.push('/');
  }

  return (
    <>
      { user ? (
        <div className='absolute top-[120%] right-[20px] px-[12px] py-[14px] rounded-tr-0 rounded-br-[20px] rounded-bl-[20px] rounded-tl-[20px] bg-white'>
          <p className='text-[12px] font-bold'>Hello, {user}!</p>
          <p className='text-[10px]'>Welcome to ShuttleTracker</p>
          <button onClick={handleLogout} className='px-[20px] py-[10px] bg-[#C90000] rounded-[20px] text-white mt-[11px] font-bold text-[14px]'>Logout
          </button>
        </div>
      ) : (
        <div className='absolute top-[120%] right-[20px] px-[12px] py-[14px] rounded-tr-0 rounded-br-[20px] rounded-bl-[20px] rounded-tl-[20px] bg-white flex flex-col' style={{ boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.25)'}}>
          <div className='flex flex-col'>
            <p className='text-[12px] font-medium'>Hello, Guest!</p>
            <p className='text-[10px]'>Welcome to <span className='text-[#0078C9]'>Shuttle<span className='text-[#002582]'>Tracker</span></span></p>
            <button className='w-[128px] h-[39px] px-[20px] py-[10px] bg-[#004099] rounded-[20px] text-white mt-[11px] font-bold text-[14px]'>
              <div className='flex justify-center gap-[9px] mt-[-1px]'>
                About Us
              </div>
            </button>
            <button className='w-[128px] h-[39px] px-[20px] py-[10px] bg-[#0078C9] rounded-[20px] text-white mt-[6px] font-bold text-[14px]' onClick={handleLoginClick}>
              <div className='flex justify-center gap-[9px] mt-[-1px]'>
                <Image alt="iconLogin" src="images/iconLogin.svg" width={20} height={20}  />
                Log In
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePopUp;
