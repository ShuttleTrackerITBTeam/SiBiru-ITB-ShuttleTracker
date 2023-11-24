export default function Home() {
  return (
    <div className="flex justify-center">
        <div className='w-[360px] h-[800px] bg-slate-100'>
            <div className="relative container mx-auto h-[103px] rounded-b-lg bg-[#F6F6F6] drop-shadow-xl flex-col">
                <div className='h-[40px]' />
                <div className='flex items-center justify-center'>
                    <a className="absolute left-0 ml-[17px]" href="/" target="_blank" rel="noopener noreferrer">
                        <img className=" rounded-full hover:brightness-110 hover:shadow-lg" src="images/back.svg" alt="back" width={39} height={39}/>
                    </a>
                    <a className="absolute right-0 mr-[17px]" href="/your-page-url-2" target="_blank" rel="noopener noreferrer">
                        <img className=" rounded-full hover:brightness-110 hover:shadow-lg" src="images/profile.svg" alt="profile" width={39} height={39}/>
                    </a>
                    <h1 className="text-center text-[18px] font-bold text-[#0078C9] font-montserrat leading-[22px]">Pusat <br/> Bantuan </h1>
                </div>
            </div>
        <div className="container mx-auto bg-transparent px-[19px] pt-[27px]">
          <div className="container mx-auto bg-[#005CB1] bg-opacity-[15%] rounded-lg">
            <div className="container mx-auto bg-transparent">
                <ul className="flex px-[2.5px] py-[2.5px] justify-between">
                    <li className="w-[5px] h-[5px] mt-[2.5px] ml-[2.5px] rounded-full bg-[#005CB1] justify-between"></li>
                    <li className="w-[5px] h-[5px] mt-[2.5px] mr-[2.5px] rounded-full bg-[#005CB1] justify-between"></li>
                </ul>
            </div>
                <ul className="flex px-[23.5px] py-[10.5px] justify-around font-montserrat">
                    <li>
                        <div className="container text-center font-bold text-[14px] text-[#005CB1]">
                            <img className="mx-auto mb-[1px]" src="images/iconHalte.svg" alt="halte" width={38} height={49}/> 
                            <a href="#Halte">Halte</a>
                        </div>
                    </li>
                    <li>
                        <div className="container text-center font-bold text-[14px] text-[#005CB1]">
                            <img className="mx-auto mb-[14px]" src="images/iconShuttle.svg" alt="halte" width={38} height={38}/> 
                            <a href="#Shuttle">Shuttle</a>
                        </div>
                    </li>
                    <li>
                        <div className="container text-center font-bold text-[14px] text-[#005CB1]">
                            <img className="mx-auto mb-[14px]" src="images/iconUser.svg" alt="halte" width={38} height={38}/> 
                            <a href="#User">User</a>
                        </div>
                    </li>
                </ul>
            <div className="container mx-auto bg-transparent">
                <ul className="flex px-[2.5px] py-[2.5px] justify-between">
                    <li className="w-[5px] h-[5px] mb-[2.5px] ml-[2.5px] rounded-full bg-[#005CB1] justify-between"></li>
                    <li className="w-[5px] h-[5px] mb-[2.5px] mr-[2.5px] rounded-full bg-[#005CB1] justify-between"></li>
                </ul>
            </div>
          </div>
        </div>
        <div className="mt-[30px] mx-[19px] font-open-sans">
            <h2 className="text-justify-left text-[16px] leading-[19.5px] font-bold text-[#0078C9] font-montserrat">Cara Mengakses Fitur Shuttle<span className="text-[#002582]">Tracker</span></h2>
            <p className="mt-[8px] ml-[19px] text-justify-left text-[14px] leading-[19px] text-[#1E1E1E]">
                Saat membuka <span className="font-bold">Shuttle<span className="text-[#002582]">Tracker</span></span>, Anda dapat menemukan tombol sebagai berikut:
            </p>
            <ul className="mt-[10px] ml-[24px]">
                <li className="flex justify-between mt-[12px]">
                    <img className="mr-[13px]" src="images/report.svg" alt="Lapor" width={28} height={28}></img>
                    <p className="text-[#1E1E1E] text-[14px] leading-[19px]"><span className="font-bold text-[#0078C9]">Lapor</span>: Pilih tombol ini saat Anda ingin memberi laporan terkait shuttle</p>
                </li>
                <li className="flex justify-between mt-[12px]">
                    <img className="ml-[2px] mr-[15px]" src="images/profile.svg" alt="Login" width={24} height={22.8}></img>
                    <p className="text-[#1E1E1E] text-[14px] leading-[19px]"><span className="font-bold text-[#0078C9]">Login</span >: Pilih tombol ini untuk mengarahkan Anda melakukan login untuk mengakses semua fitur</p>
                </li>
                <li className="flex justify-between mt-[12px]">
                    <img className="mr-[13px]" src="images/iconHalte.svg" alt="Halte" width={28} height={32}></img>
                    <p className="text-[#1E1E1E] text-[14px] leading-[19px]"><span className="font-bold text-[#0078C9]">Nama Halte</span>: Pilih icon halte saat Anda ingin mengetahui nama dari halte tersebut</p>
                </li>
                <li className="flex justify-between mt-[12px]">
                    <img className="mr-[13px]" src="images/iconHalteWhite.svg" alt="Halte" width={28} height={32}></img>
                    <p className="text-[#1E1E1E] text-[14px] leading-[19px]"><span className="font-bold text-[#0078C9]">Halte Terdekat</span> : Pilih tombol “Tampilkan Halte Terdekat” saat Anda ingin mengetahui halte dengan jarak terdekat dari Anda</p>
                </li>
            </ul>   
            <h2 className="mt-[30px] text-justify-left text-[16px] leading-[19.5px] font-bold text-[#0078C9] font-montserrat">Butuh Lebih Banyak Bantuan?</h2>
            <a href="https://your-google-form-link" target="_blank" rel="noopener noreferrer">
                <div className="container flex h-[67px] w-[322px] mt-[8px] bg-gradient-to-t from-[#005BBF] to-[#0078C9] rounded-[22.79px] drop-shadow-xl items-center justify-between hover:brightness-110">
                    <div className="ml-[23px] h-[15px] w-[15px] bg-transparent-500"></div>
                    <h2 className="text-white text-[16px] leading-[19.5px] font-montserrat weight-[600]">Tanya Disini!</h2>
                    <img className="mr-[23px]" src="images/arrow.svg" alt="arrow" width={15} height={15} />
                </div>
            </a>
        </div>

      </div>
    </div>
  );
}