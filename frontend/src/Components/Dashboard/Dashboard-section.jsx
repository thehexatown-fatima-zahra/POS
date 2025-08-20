'use client'

import Sidebar from './Sidebar'
import Card from './Card'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { useState, useEffect } from 'react'
import Header from '../header'
import CardList from './cardList'
import { getMetrics } from '@/services/getDashboardMetrics'

export default function Dashboard() {
  const [range, setRange] = useState('Daily')
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const metricsData = await getMetrics();
        console.log("Metrics inside Dashboard:", metricsData); 
        setMetrics(metricsData);
      } catch (err) {
        console.error("Failed to load metrics:", err);
      } finally {
        setLoading(false); 
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Failed to load metrics
      </div>
    )
  }

  const cards = [
    { title: 'Daily Sales', value: `$${metrics.dailySales.toLocaleString()}`, date:'9 Feb 2024' },
    { title: 'Monthly Revenue', value: `$${metrics.monthlyRevenue.toLocaleString()}`, date: '1 Jan- 1 Feb' },
    { title: 'Table Occupancy', value: metrics.tableOccupancy, date: '' },
  ]

  const salesData = metrics.salesGraphData?.[range.toLowerCase()] || []
  const revenueData = metrics.revenueGraphData?.[range.toLowerCase()] || []

  const combinedData = salesData.map((item, idx) => {
    let label = item.day || item.week || item.month || ''
    return {
      name: label,
      sales: item.sales,
      revenue: revenueData[idx]?.revenue || 0
    }
  })

  const dishes = metrics.popularDishes.map((dish, i) => ({
    id: i + 1,
    title: dish,
    price: '$55.00',
    status: i === 2 ? 'Out of stock' : 'In Stock',
    img: 'pic.png',
  }))

  return (
    <div className="min-h-screen flex bg-[#0f1112] text-white">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
         <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {cards.map((c, i) => (
            <Card key={i} {...c} className=" " />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-6 text-[25px]">
          <CardList title="Popular Dishes" items={dishes} />
          <CardList title="Popular Dishes" items={dishes} />
        </div>

        <div className="bg-[#2a2c2e] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Overview ({range})</h2>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-4 bg-[#0f1112] p-1 rounded-md">
                {['Monthly', 'Daily', 'Weekly'].map(x => (
                  <button
                    key={x}
                    onClick={() => setRange(x)}
                    className={`px-3 py-1 rounded-md text-sm ${range === x ? 'bg-pink-200 text-black' : 'text-gray-400'}`}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <button className="py-2 px-4 bg-white/10 rounded-md text-sm text-[#FAC1D9] flex items-center gap-2">
                <img src="download.png" alt="" className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[6px] bg-[#f6a8d9] border border-none rounded-md"></span>
              <span className="text-gray-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-[6px] bg-[#9aa0a6] border border-none rounded-md"></span>
              <span className="text-gray-400">Sales</span>
            </div>
          </div>

          <div style={{ height: 340 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData}>
                <CartesianGrid  stroke="#444444" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#9aa0a6' }}  interval={0} padding={{ left: 20, right: 20 }}/>
                <YAxis tick={{ fill: '#9aa0a6' }} orientation="right" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#f6a8d9" strokeWidth={3} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="sales" stroke="#9aa0a6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  )
}
