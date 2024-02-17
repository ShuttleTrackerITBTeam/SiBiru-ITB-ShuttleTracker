import Image from 'next/image';
import { useEffect } from 'react';
import { useMapDetails } from '@src/services/MapDetailsContext';

interface Shuttle {
  loaded: boolean;
  id : string;
  coordinates: {
    lat: number;
    lng: number;
  };
  halte: string;
  countMhs: number;
  route: String;
  waitingTime: number;
  arriveTime: string;
  error: any;
}

interface HaltePopUpProps {
  isButtonClicked: boolean;
  setIsButtonClicked: (isButtonClicked: boolean) => void;
}

const HaltePopUp: React.FC<HaltePopUpProps> = ({ isButtonClicked, setIsButtonClicked }) => {
    const { 
      shuttles,
      filteredShuttles, setFilteredShuttles,
      location, halteMarkers,
      selectedHalte, setSelectedHalte,
      selectedRoute, setSelectedRoute,
      showGreyLine, showBlueLine,
      setShowGreyLine, setShowBlueLine,
      getNearestHalte, getFilteredShuttles,
      getPreviousHalte
    } = useMapDetails()

    useEffect(() => {
      const fetchBusses = async () => {
        const newShuttles = await getFilteredShuttles(selectedHalte, shuttles);
        setFilteredShuttles(newShuttles);
      }

      fetchBusses();
    }, [setFilteredShuttles, selectedHalte, shuttles, setSelectedHalte, isButtonClicked, setIsButtonClicked])

    const handleButtonClick = () => {
      const nearestHalte = getNearestHalte(location, halteMarkers);
      setSelectedHalte(nearestHalte);
      setIsButtonClicked(!isButtonClicked);
    };
  
    const handleRouteButtonClick = (route: string) => {
      if (route === 'Blue' && showBlueLine && !(showBlueLine && showGreyLine)) {
        setShowGreyLine(true);
        setSelectedRoute('');
      }
      else if (route === 'Grey' && showGreyLine && !(showBlueLine && showGreyLine)) {
        setShowBlueLine(true);
        setSelectedRoute('');
      }
      else {
        setSelectedRoute(route);
        if (route === 'Blue') {
          setShowGreyLine(false);
          setShowBlueLine(true);
        } else if (route === 'Grey') {
          setShowGreyLine(true);
          setShowBlueLine(false);
        }
        else {
          setShowBlueLine(true);
          setShowGreyLine(true);
        }
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
          selectedHalte && (
            <div className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] p-2 rounded-2xl absolute w-[90%] h-fit bottom-11'>
              <div className='w-[100%] flex justify-end'>
                <Image src="/images/closeBusPanel.svg" alt='close-button' width={25} height={25} onClick={() => {handleButtonClick(); handleRouteButtonClick('')}} style={{ cursor: 'pointer' }}/>
              </div>
              <div className='flex justify-between pb-2'>
                <div className='flex w-full'>
                  <Image className="ml-[5px]" src={'/images/busLocationPanel.svg'} alt="bus location" width={50} height={50} />
                  <div className='flex flex-col relative w-full h-full header-busPanel ml-3'>
                    <p className='font-bold text-white'>Halte</p>
                    <p className='font-bold text-white text-2xl'>{selectedHalte.popUp}</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-end w-full items-end gap-2 mr-[14px] border-b-[#0078C9] border-b-[3px] border-solid pb-3'>
                <button onClick={() => handleRouteButtonClick('Blue')} className={`flex items-center justify-center rounded-[20px] w-[50%] h-[20px] p-4 ${selectedRoute === 'Blue' ? 'bg-[#004099] text-white' : 'bg-[#0078C9] text-white'} `}>Blue Route</button>
                <button onClick={() => handleRouteButtonClick('Grey')} className={`flex items-center justify-center rounded-[20px] w-[50%] h-[20px] p-4 ${selectedRoute === 'Grey' ? 'bg-[#004099] text-white' : 'bg-[#0078C9] text-white'} `}>Grey Route</button>
              </div>
              <div>
                {filteredShuttles.map((shuttle: Shuttle, index: number) => (
                  <div key={`${index}-${index}`} className='relative flex mt-3 mb-3'>
                    {shuttle.route === 'Blue' ? (
                      <Image className='mt-1 ml-3' src={'/images/blueBus.svg'} alt="bus location" width={35} height={35}/>
                    ) : (
                      <Image className='mt-1 ml-3' src={'/images/greyBus.svg'} alt="bus location" width={35} height={35}/>
                    )}
                    <div className='ml-3'>
                      <p className='font-extralight text-white text-xs'>{shuttle.route === 'Blue' ? 'Bis Biru' : 'Bis Abu'}</p>
                      <p className='font-bold text-white text-xs'>KAPASITAS {shuttle.countMhs}/19</p>
                      <p className='font-extralight text-white text-[8px] sm:text-[11px]'>{getPreviousHalte(shuttle)} - {shuttle.halte}</p>
                    </div>
                    <div className=' bg-[#00409980] bg-opacity-50 h-fit absolute w-fit rounded-lg right-3 p-1.5'>
                      <div className='flex items-center'>
                        <p className='font-thin text-xs text-white mx-1.5'>Tiba dalam</p>
                        <div className='inline-block mx-1.5 w-11'>
                          <p className='font-extralight text-white text-center'>{shuttle.waitingTime} mins</p>
                          <p className='font-extralight text-white text-center'>{shuttle.arriveTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default HaltePopUp;
