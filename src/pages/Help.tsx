import { usePages } from '@src/services/PagesContext';

const Help = () => {
    const { showHelp } = usePages();

    return (
        showHelp && (
            <div className="flex w-screen h-screen justify-center overflow-y-auto">
                <div className='mt-14 w-full max-w-[468px]'>
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
                                            <img className="mx-auto mb-[11px]" src="images/iconHalte.png" alt="halte" width={27} height={27}/> 
                                            <a href="#Halte">Halte</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="container text-center font-bold text-[14px] text-[#005CB1]">
                                            <img className="mx-auto mb-[12px]" src="images/blueBus.svg" alt="halte" width={38} height={38}/> 
                                            <a href="#Shuttle">Shuttle</a>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="container text-center font-bold text-[14px] text-[#005CB1]">
                                            <img className="mx-auto mb-[12px]" src="images/iconUser.png" alt="halte" width={38} height={38}/> 
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
                    <div className="mt-[30px] mx-[19px] font-open-sans pb-5">
                        <h2 className="text-justify-left text-[14px] leading-[19.5px] font-bold text-[#0078C9] font-montserrat">Cara Mengakses Fitur Shuttle<span className="text-[#002582]">Tracker</span></h2>
                        <p className="mt-[8px] ml-[9px] text-justify-left text-[12px] leading-[19px] text-[#1E1E1E]">
                            Saat membuka <span className="font-bold text-[#0078C9] font-montserrat">Shuttle<span className="font-bold text-[#002582] font-montserrat">Tracker</span></span>, Anda dapat menemukan tombol sebagai berikut:
                        </p>
                        <ul className="mt-[10px] ml-[12px]">
                            <li className="flex justify-start mt-[10px]">
                                <img className="mr-[13px]" src="images/report.svg" alt="Lapor" width={28} height={28}></img>
                                <p className="text-[#1E1E1E] text-[12px] leading-[19px]"><span className="font-bold text-[#0078C9]">Lapor</span>: Pilih tombol ini saat Anda ingin memberi laporan terkait shuttle</p>
                            </li>
                            <li className="flex justify-start mt-[10px]">
                                <img className="mr-[13px]" src="images/iconHalte.png" alt="Halte" width={28} height={28}></img>
                                <p className="text-[#1E1E1E] text-[12px] leading-[19px]"><span className="font-bold text-[#0078C9]">Nama Halte</span>: Pilih icon halte saat Anda ingin mengetahui nama dari halte tersebut</p>
                            </li>
                            <li className="flex justify-start mt-[10px]">
                                <img className="mr-[8px] ml-[-4px]" src="images/iconHalteWhite.png" alt="Halte" width={36} height={28}></img>
                                <p className="text-[#1E1E1E] text-[12px] leading-[19px]"><span className="font-bold text-[#0078C9]">Halte Terdekat</span> : Pilih tombol “Tampilkan Halte Terdekat” saat Anda ingin mengetahui halte dengan jarak terdekat dari Anda</p>
                            </li>
                        </ul>   
                        <h2 className="mt-[30px] text-justify-left text-[14px] leading-[19.5px] font-bold text-[#0078C9] font-montserrat">Butuh Lebih Banyak Bantuan?</h2>
                        <a href="https://forms.gle/J2oaFWVQbFGvheHD9" target="_blank" rel="noopener noreferrer">
                            <div className="flex w-[100%] justify-center">
                                <div className="container flex h-[57px] w-[100%] mt-[14px] bg-gradient-to-t from-[#005BBF] to-[#0078C9] rounded-[22.79px] drop-shadow-xl items-center justify-between hover:brightness-110">
                                    <div className="ml-[23px] h-[10px] w-[15px] bg-transparent-500"></div>
                                    <h2 className="text-white text-[14px] leading-[19.5px] font-montserrat weight-[600]">Tanya Disini!</h2>
                                    <img className="mr-[23px]" src="images/arrow.svg" alt="arrow" width={10} height={10} />
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    );
}

export default Help;