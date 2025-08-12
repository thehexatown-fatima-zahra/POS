export default function Card({ title, value, date }) {
  return (
    <div className="bg-[#2a2c2e] rounded-xl p-4 flex flex-col justify-between shadow-inner w-full">
      <div>
        <div className="text-[16px] font-light text-white font-poppins">{title}</div>
        <div className="text-[25px] font-semibold mt-2">{value}</div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <div className="text-[16px] text-gray-500 font-poppins">
          {date || ''} 
        </div>
        <img src="frame.png" alt="" className="" />
      </div>
    </div>
  );
}
