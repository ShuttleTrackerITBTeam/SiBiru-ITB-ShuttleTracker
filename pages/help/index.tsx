export default function Home() {
  return (
    <div>
      <div className="container mx-auto h-30 bg-[#D9D9D9] px-1"><h1>.</h1></div>  
      <div className='container mx-auto h-65 rounded-b-lg bg-gradient-to-r from-[#005CB1] to-[#7BBFF1]'>
        <h1 className="text-center text-xl font-bold text-[#FFFFFF] font-montserrat">
            Pusat Bantuan
        </h1>
      </div>
      <div className="container mx-auto bg-transparent px-10 py-10">
        <div className="container mx-auto bg-[#005CB1] rounded-lg">
            <ul className="mt-4 flex px-10 py-10 justify-between">
                <li>
                    <a href="#Halte">Halte</a>
                </li>
                <li>
                    <a href="#Shuttle">Shuttle</a>
                </li>
                <li>
                    <a href="#User">User</a>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
}