export default function Home() {
  return (
    <div className="flex justify-center">
      <div className='w-[390px]'>
        <div className='relative container mx-auto h-[95px] rounded-b-lg bg-gradient-to-r from-[#005CB1] to-[#7BBFF1] flex-col'>
          <div className='h-[43px]' />
          <div className='flex items-center justify-center'>
            <img className="absolute left-0 ml-[17px]" src="images/back.svg" alt="back" width={39} height={39}/>
            <h1 className="text-center text-xl font-bold text-[#FFFFFF] font-montserrat">
              Pusat Bantuan
            </h1>
          </div>
        </div>
        <div className="container mx-auto bg-transparent p-[19px]">
          <div className="container mx-auto bg-[#005CB1] rounded-lg">
              <ul className="mt-4 flex px-[31.5px] py-[13px] justify-between">
                  <li>
                    <div className="container text-center">
                      <div className="box-border h-[48px] w-[48px] bg-white mb-[10px]" />
                      <a href="#Halte0">Halte</a>
                    </div>
                  </li>
                  <li>
                    <div className="container text-center">
                      <div className="box-border h-[48px] w-[48px] bg-white mb-[10px]" />
                      <a href="#Shuttle">Shuttle</a>
                    </div>
                  </li>
                  <li>
                    <div className="container text-center">
                      <div className="box-border h-[48px] w-[48px] bg-white mb-[10px]" />
                      <a href="#User">User</a>
                    </div>
                  </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  );
}