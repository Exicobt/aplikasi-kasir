// app/dapur/page.js
'use client'
import { useEffect, useState } from 'react'
import { Utensils, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

export default function DapurPage() {
  const [orders, setOrders] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const mockOrders = [
      {
        id: '1',
        orderNumber: 42,
        items: [
          { name: 'Nasi Goreng Spesial', quantity: 2 },
          { name: 'Es Teh Manis', quantity: 1 }
        ],
        status: 'pending',
        createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
        estimatedTime: 20
      },
      {
        id: '2',
        orderNumber: 43,
        items: [
          { name: 'Mie Goreng', quantity: 1 },
          { name: 'Ayam Bakar', quantity: 1 }
        ],
        status: 'cooking',
        createdAt: new Date(Date.now() - 5 * 60000), // 5 minutes ago
        estimatedTime: 15
      }
    ]
    setOrders(mockOrders)

    // Update time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate remaining time
  const getRemainingTime = (order) => {
    if (!order.estimatedTime) return 0
    const elapsed = (currentTime.getTime() - order.createdAt.getTime()) / 60000
    return Math.max(0, Math.floor(order.estimatedTime - elapsed))
  }

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Utensils className="h-8 w-8 text-orange-600" />
          <h1 className="text-2xl font-bold text-gray-800">Dapur</h1>
        </div>
        <div className="text-lg font-medium text-gray-600">
          {currentTime.toLocaleTimeString()}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Order Queue */}
        <div className="col-span-full">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Clock className="h-5 w-5 text-blue-500" />
            Antrian Order (FIFO)
          </h2>
          <div className="space-y-4">
            {orders
              .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
              .map(order => (
                <div
                  key={order.id}
                  className={`rounded-lg border p-4 shadow-sm transition-all ${
                    order.status === 'pending'
                      ? 'border-orange-200 bg-orange-50'
                      : order.status === 'cooking'
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {order.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          order.status === 'pending'
                            ? 'bg-orange-100 text-orange-800'
                            : order.status === 'cooking'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.status === 'pending'
                          ? 'Menunggu'
                          : order.status === 'cooking'
                          ? 'Dimasak'
                          : 'Siap'}
                      </span>
                      {order.status === 'cooking' && (
                        <span className="text-sm font-medium text-gray-600">
                          {getRemainingTime(order)} menit lagi
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 border-t pt-3">
                    <h4 className="mb-2 text-sm font-medium text-gray-700">
                      Items:
                    </h4>
                    <ul className="space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="font-medium">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cooking')}
                        className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        Mulai Masak
                      </button>
                    )}
                    {order.status === 'cooking' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                      >
                        Tandai Selesai
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"
                      >
                        Order Diambil
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Kitchen Stats */}
        <div className="col-span-full mt-8">
          <h2 className="mb-4 text-xl font-semibold">Statistik Dapur</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                <h3 className="font-medium">Pending</h3>
              </div>
              <p className="mt-2 text-3xl font-bold">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-blue-500" />
                <h3 className="font-medium">Dalam Proses</h3>
              </div>
              <p className="mt-2 text-3xl font-bold">
                {orders.filter(o => o.status === 'cooking').length}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="font-medium">Selesai Hari Ini</h3>
              </div>
              <p className="mt-2 text-3xl font-bold">
                {orders.filter(o => o.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}