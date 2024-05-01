import { usePages } from '@src/services/PagesContext';
import Image from 'next/image';

const Report = () => {
    const { showReport } = usePages();

    return (
        showReport && (
            <div className="flex w-screen h-screen justify-center items-center overflow-y-hidden">
                <div className='w-full max-w-[468px] h-[100vh] flex items-center justify-center'>
                    <div className="mt-[30px] mx-[19px] font-open-sans flex flex-col items-center justify-center">
                        <div>
                            <Image src="/images/report.svg" alt='report' width={150} height={150} />
                        </div>
                        <p className="text-[#1E1E1E] text-[14px] leading-[19px] text-center">Berikan saran atau laporan Anda dengan <br /> mengakses halaman di bawah ini</p>
                        {/* <a href="https://forms.gle/8rXwmaeP33aEaXsf8" target="_blank" rel="noopener noreferrer">
                            <div className="container flex h-[57px] w-[100%] px-[126px] mt-[14px] bg-gradient-to-t from-[#005BBF] to-[#0078C9] rounded-[22.79px] drop-shadow-xl items-center justify-center hover:brightness-110">
                                <h2 className="text-white text-[14px] leading-[19.5px] font-montserrat weight-[600]">Buat Laporan</h2>
                            </div>
                        </a> */}
                        <a href="https://forms.gle/uAtJUgfmhMXtnMuYA" target="_blank" rel="noopener noreferrer">
                            <div className="container flex h-[57px] w-[100%] px-[124px] mt-[14px] bg-gradient-to-t from-[#008CC6] to-[#04B6FF] rounded-[22.79px] drop-shadow-xl items-center justify-center hover:brightness-110">
                                <h2 className="text-white text-[14px] leading-[19.5px] font-montserrat weight-[600]">Berikan Saran</h2>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    );
}

export default Report;