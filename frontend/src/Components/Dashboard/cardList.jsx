'use client';

export default function CardList({ title, items = [] }) {
  return (
    <div className="bg-[#292C2D] rounded-xl p-4 flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{title}</h3>
        <button className="text-sm text-pink-200 underline">See All</button>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-[#3D4142] p-3 rounded-md"
          >
            <img
              src={item.img}
              alt="dish"
              className="w-14 h-14 object-cover rounded-md"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="flex flex-col items-end text-sm">
                  <div
                    className={`text-[16px] ${
                      item.status === 'Out of stock'
                        ? 'text-[#F60000]'
                        : 'text-[#FAC1D9]'
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2 flex justify-between">
               <p>Serving · 01 person</p>
                <div className="text-gray-300 mt-1">{item.price}</div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
