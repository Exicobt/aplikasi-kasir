'use client'

import { useEffect, useState } from "react"
import { Clock, ChefHat, CheckCircle, Calendar, Bell, Menu } from "lucide-react"
import Navbar from "../components/navbar"

const Page = () => {
  const [orders, setOrders] = useState([])
  const [waiting, setWaiting] = useState(0)
  const [finish, setFinish] = useState(0)
  const [cooked, setCooked] = useState(0)
  const [finishToday, setFinishToday] = useState(0)
  const [isLoading, setIsloading] = useState(false)

  const fetchOrders = async() => {
    setIsloading(true)
    await fetch("/api/orders")
      .then(async (res) => {
        const data = await res.json()
        setOrders(data)
        setWaiting(data.filter(order => order.status === 'waiting').length)
        setCooked(data.filter(order => order.status === 'preparing').length)
        setFinish(data.filter(order => order.status === 'done').length)
        setIsloading(false)
      })
  }

  const updateStatus = async(order, status) => {
    await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        basket_id: order.id,
        status: status
      })
    })
    fetchOrders()
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const refresh = () => {
    fetchOrders()
  }

  const hamburgerMenu = () => {
    return(
      <div className="z-[999] bg-white h-full fixed  w-[450px]"></div>
    )
  }

  const getStatusConfig = (status) => {
    const configs = {
      waiting: {
        bg: "bg-gradient-to-br from-orange-50 to-yellow-50 border-l-4 border-orange-400",
        badge: "bg-orange-100 text-orange-800",
        icon: Clock,
        iconColor: "text-orange-500"
      },
      preparing: {
        bg: "bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400",
        badge: "bg-blue-100 text-blue-800",
        icon: ChefHat,
        iconColor: "text-blue-500"
      },
      done: {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-400",
        badge: "bg-green-100 text-green-800",
        icon: CheckCircle,
        iconColor: "text-green-500"
      }
    }
    return configs[status] || configs.waiting
  }

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100'>
      <Navbar />

      <div className='w-full pt-20 px-6 pb-8'>
        <div className='w-full mb-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
          <div className='bg-gradient-to-br from-orange-400 to-yellow-500 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300'>
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 opacity-80" />
              <Bell className="w-5 h-5 opacity-60" />
            </div>
            <div className="text-3xl font-bold mb-2">{waiting}</div>
            <div className="text-orange-100 font-medium">Dalam Antrean</div>
          </div>

          <div className='bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300'>
            <div className="flex items-center justify-between mb-4">
              <ChefHat className="w-8 h-8 opacity-80" />
            </div>
            <div className="text-3xl font-bold mb-2">{cooked}</div>
            <div className="text-blue-100 font-medium">Sedang Dimasak</div>
          </div>

          <div className='bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300'>
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 opacity-80" />
            </div>
            <div className="text-3xl font-bold mb-2">{finish}</div>
            <div className="text-green-100 font-medium">Siap Disajikan</div>
          </div>

          <div className='bg-gradient-to-br from-purple-400 to-pink-500 text-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300'>
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 opacity-80" />
            </div>
            <div className="text-3xl font-bold mb-2">{finishToday}</div>
            <div className="text-purple-100 font-medium">Selesai Hari Ini</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Daftar Pesanan</h2>
              <p className="text-gray-500">Kelola semua pesanan yang masuk</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-200 transition-colors">
                Filter
              </button>
              <button onClick={refresh} disabled={isLoading ? true : false} className={`${isLoading ? 'bg-orange-100' : 'bg-orange-500 hover:bg-orange-600'}  text-white px-4 py-2 rounded-lg font-medium  transition-colors`}>
                Refresh
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {
              orders.length < 1 ? 
              <div className="text-center text-black/50 my-20">Tidak Ada Pesanan Hari Ini</div> : 
              orders.map((order, index) => {
              const config = getStatusConfig(order.status)
              const StatusIcon = config.icon
              
              return (
                <div key={order.id} className={`${config.bg} rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="bg-white p-3 rounded-xl shadow-sm">
                        <StatusIcon className={`w-6 h-6 ${config.iconColor}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-800">{order.id}</h3>
                          <span className={`${config.badge} px-3 py-1 rounded-full text-sm font-medium`}>
                            {order.status === 'waiting' ? 'Menunggu' : 
                            order.status === 'preparing' ? 'Memasak' : 'Siap'}
                          </span>
                        </div>
                        
                        <div className="text-gray-600 mb-3">
                          <span className="font-semibold">Meja {order.customers.table.table_number}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {order.orders.map((item, idx) => (
                            <span key={idx} className="bg-white bg-opacity-60 px-3 py-1 rounded-lg text-sm font-medium text-gray-700">
                              {item.menu.nama}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      {order.status === 'waiting' && (
                        <button onClick={() => updateStatus(order, "preparing")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Mulai Masak
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button onClick={() => updateStatus(order, "done")}className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Selesai
                        </button>
                      )}
                      {order.status === 'done' && (
                        <button onClick={() => updateStatus(order, "finish")} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors animate-pulse">
                          Ambil Pesanan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page