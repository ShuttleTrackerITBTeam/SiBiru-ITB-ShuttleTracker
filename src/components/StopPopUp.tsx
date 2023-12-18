import Image from 'next/image';
import LoginWarning from './LoginWarning';
import { useEffect, useState } from 'react';
import { useAuth } from '@src/services/AuthContext';
import { useMapDetails } from '@src/services/MapDetailsContext';

interface Bus {
  loaded: boolean;
  namaBus : string;
  coordinates: {
    lat: number;
    lng: number;
  };
  halte: string;
  numberMhs: number;
  waitingTime: number;
  arriveTime: string;
  error: any;
}

interface StopPopUpProps {
  isButtonClicked: boolean;
  setIsButtonClicked: (isButtonClicked: boolean) => void;
}

const StopPopUp: React.FC<StopPopUpProps> = ({ isButtonClicked, setIsButtonClicked }) => {
    const { user, isProfilePopUpOpen, setIsProfilePopUpOpen } = useAuth()
    const { 
      bus1, bus2,
      busses, setBusses,
      location, markers,
      selectedStop, setSelectedStop,
      selectedRoute, setSelectedRoute,
      setShowGreyLine, setShowBlueLine,
      getNearestStop, getBusses
    } = useMapDetails()
    const [isLoginWarningOpen, setIsLoginWarningOpen] = useState(false);

    useEffect(() => {
      const fetchBusses = async () => {
        const newBusses = await getBusses(selectedStop, bus1, bus2);
        setBusses(newBusses);
      }

      fetchBusses();
    }, [setBusses, selectedStop, bus1, bus2, setSelectedStop, isButtonClicked, setIsButtonClicked])

    const handleButtonClick = () => {
      if (user === "") {
        handleOpenLoginWarning();
      }
      if (isProfilePopUpOpen) {
        setIsProfilePopUpOpen(false);
      }

      const nearestStop = getNearestStop(location, markers);
      setSelectedStop(nearestStop);
      setIsButtonClicked(!isButtonClicked);
    };
  
    const handleOpenLoginWarning = () => {
      setIsLoginWarningOpen(true);
    };
  
    const handleCloseLoginWarning = () => {
      setIsLoginWarningOpen(false);
      setIsButtonClicked(!isButtonClicked);
    };
  
    const handleRouteButtonClick = (route: string) => {
      setSelectedRoute(route);
      if (route === 'Route1') {
        setShowGreyLine(true);
        setShowBlueLine(false);
      } else if (route === 'Route2') {
        setShowGreyLine(false);
        setShowBlueLine(true);
      }
      else {
        setShowBlueLine(true);
        setShowGreyLine(true);
      }
    };

  return (
    <div className='fixed z-[401] item-center h-[100px] w-full md:w-[100%] bottom-0'>
      <div className='justify-center w-full flex'>
        <button className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] w-[256px] h-[46px] rounded-3xl' onClick={handleButtonClick}>
          <div className='flex justify-center items-center mt-[2px]'>
            <Image src={'/images/busLocationPanel.svg'} alt="bus location" width={22} height={29} />
            <p className='ml-2 text-[14px] font-bold text-white mt-[-3px]'>Tampilkan Halte Terdekat</p>
          </div>
        </button>
        {( isButtonClicked &&            
          ( user === "" ? (
            <div className='absolute bottom-[0px] h-screen'>
              <LoginWarning isOpen={isLoginWarningOpen} onClose={handleCloseLoginWarning}></LoginWarning>
            </div>
          ) : (
            selectedStop && (
              <div className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] p-2 rounded-2xl absolute w-[90%] h-fit bottom-11'>
                <div className='w-[100%] flex justify-end'>
                  <Image src="/images/closeBusPanel.svg" alt='close-button' width={25} height={25} onClick={() => {handleButtonClick(); handleRouteButtonClick('')}} style={{ cursor: 'pointer' }}/>
                </div>
                <div className='flex justify-between pb-2'>
                  <div className='flex w-full'>
                    <Image className="ml-[5px]" src={'/images/busLocationPanel.svg'} alt="bus location" width={50} height={50} />
                    <div className='flex flex-col relative w-full h-full header-busPanel ml-3'>
                      <p className='font-bold text-white'>Halte</p>
                      <p className='font-bold text-white text-2xl'>{selectedStop.popUp}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-end w-full items-end gap-2 mr-[14px] border-b-[#0078C9] border-b-[3px] border-solid pb-3'>
                  <button onClick={() => handleRouteButtonClick('Route1')} className={`flex items-center justify-center rounded-[20px] w-[50%] h-[20px] p-4 ${selectedRoute === 'Route1' ? 'bg-[#004099] text-white' : 'bg-[#0078C9] text-white'} `}>Grey Route</button>
                  <button onClick={() => handleRouteButtonClick('Route2')} className={`flex items-center justify-center rounded-[20px] w-[50%] h-[20px] p-4 ${selectedRoute === 'Route2' ? 'bg-[#004099] text-white' : 'bg-[#0078C9] text-white'} `}>Blue Route</button>
                </div>
                <div>
                  {busses.map((busArray: Bus[], index: number) => 
                    busArray.map((busItem, subIndex) => (
                      <div key={`${index}-${subIndex}`} className='relative flex mt-3 mb-3'>
                        {busItem.namaBus === 'Bus Abu' ? (
                          <Image className='mt-1 ml-3' src={'/images/greyBus.svg'} alt="bus location" width={35} height={35}/>
                        ) : (
                          <Image className='mt-1 ml-3' src={'/images/blueBus.svg'} alt="bus location" width={35} height={35}/>
                        )}
                        <div className='mt-1.5 ml-3'>
                          <p className='font-extralight text-white text-xs'>{busItem.namaBus}</p>
                          <p className='font-bold text-white text-xs'>{busItem.numberMhs}/19 CAPACITY</p>
                          <p className='font-extralight text-white text-xs flex'>is Going to <p className='font-bold ml-1'> {busItem.halte}</p></p>
                        </div>
                        <div className=' bg-[#00409980] bg-opacity-50 h-fit absolute w-fit rounded-lg right-3 p-1.5'>
                          <div className='flex items-center'>
                            <p className='font-thin text-xs text-white mx-1.5'>Arriving in</p>
                            <div className='inline-block mx-1.5 w-11'>
                              <p className='font-extralight text-white text-center'>{busItem.waitingTime} mins</p>
                              <p className='font-extralight text-white text-center'>{busItem.arriveTime}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  )
}

export default StopPopUp;
