"use client";
import { useState } from "react";
import {
  BarChart3,
  Users,
  Utensils,
  ShoppingCart,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data
  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      amount: 150000,
      status: "Completed",
      date: "2023-05-15",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      amount: 85000,
      status: "Processing",
      date: "2023-05-15",
    },
    {
      id: "#ORD-003",
      customer: "Robert Johnson",
      amount: 120000,
      status: "Pending",
      date: "2023-05-14",
    },
  ];

  const menuItems = [
    { name: "Nasi Goreng", category: "Makanan", price: 25000, stock: 45 },
    { name: "Es Teh Manis", category: "Minuman", price: 8000, stock: 120 },
    { name: "Ayam Bakar", category: "Makanan", price: 35000, stock: 32 },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex flex-col w-72 h-full bg-white">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <SidebarLink
              icon={<BarChart3 className="h-5 w-5" />}
              text="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarLink
              icon={<ShoppingCart className="h-5 w-5" />}
              text="Orders"
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            />
            <SidebarLink
              icon={<Utensils className="h-5 w-5" />}
              text="Menu"
              active={activeTab === "menu"}
              onClick={() => setActiveTab("menu")}
            />
            <SidebarLink
              icon={<Users className="h-5 w-5" />}
              text="Customers"
              active={activeTab === "customers"}
              onClick={() => setActiveTab("customers")}
            />
            <SidebarLink
              icon={<Settings className="h-5 w-5" />}
              text="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </nav>
          <div className="p-4 border-t">
            <button className="flex items-center space-x-2 text-red-500">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-72 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <SidebarLink
              icon={<BarChart3 className="h-5 w-5" />}
              text="Dashboard"
              active={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <SidebarLink
              icon={<ShoppingCart className="h-5 w-5" />}
              text="Orders"
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            />
            <SidebarLink
              icon={<Utensils className="h-5 w-5" />}
              text="Menu"
              active={activeTab === "menu"}
              onClick={() => setActiveTab("menu")}
            />
            <SidebarLink
              icon={<Users className="h-5 w-5" />}
              text="Customers"
              active={activeTab === "customers"}
              onClick={() => setActiveTab("customers")}
            />
            <SidebarLink
              icon={<Settings className="h-5 w-5" />}
              text="Settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
            />
          </nav>
          <div className="p-4 border-t">
            <button className="flex items-center space-x-2 text-red-500">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-white">
          <button
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Dashboard Overview
              </h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value="Rp 12,450,000"
                  change="+12% from last month"
                  icon={<BarChart3 className="h-6 w-6 text-blue-500" />}
                />
                <StatCard
                  title="Total Orders"
                  value="342"
                  change="+8% from last month"
                  icon={<ShoppingCart className="h-6 w-6 text-green-500" />}
                />
                <StatCard
                  title="Menu Items"
                  value="56"
                  change="+3 new items"
                  icon={<Utensils className="h-6 w-6 text-orange-500" />}
                />
                <StatCard
                  title="Active Customers"
                  value="1,243"
                  change="+5% from last month"
                  icon={<Users className="h-6 w-6 text-purple-500" />}
                />
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Recent Orders</span>
                    <Button variant="ghost">View All</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>
                            Rp {order.amount.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                order.status === "Completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Order Management
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline">All</Button>
                  <Button variant="ghost">Pending</Button>
                  <Button variant="ghost">Processing</Button>
                  <Button variant="ghost">Completed</Button>
                </div>
                <Button>Export</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>3 items</TableCell>
                          <TableCell>
                            Rp {order.amount.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>
                            <Select defaultValue={order.status.toLowerCase()}>
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">
                                  Processing
                                </SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "menu" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Menu Management
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline">All</Button>
                  <Button variant="ghost">Food</Button>
                  <Button variant="ghost">Drinks</Button>
                  <Button variant="ghost">Desserts</Button>
                </div>
                <Button>Add New Item</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {menuItems.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>
                            Rp {item.price.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className="bg-green-500 h-2.5 rounded-full"
                                  style={{
                                    width: `${Math.min(
                                      100,
                                      (item.stock / 100) * 100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                              <span>{item.stock}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Available
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500"
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Customer Management
              </h2>
              <div className="flex justify-end">
                <Button>Add Customer</Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Orders</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>081234567890</TableCell>
                        <TableCell>12 orders</TableCell>
                        <TableCell>2023-05-15</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Restaurant Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Restaurant Name
                        </label>
                        <input
                          type="text"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="My Restaurant"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <textarea
                          rows={3}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          defaultValue="123 Main Street, City"
                        />
                      </div>
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day) => (
                        <div key={day} className="flex items-center space-x-4">
                          <div className="w-24">
                            <label className="block text-sm font-medium text-gray-700">
                              {day}
                            </label>
                          </div>
                          <div className="flex-1 flex space-x-2">
                            <input
                              type="time"
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              defaultValue="08:00"
                            />
                            <span className="flex items-center">to</span>
                            <input
                              type="time"
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              defaultValue="22:00"
                            />
                          </div>
                        </div>
                      ))}
                      <Button>Update Hours</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Reusable Components
const SidebarLink = ({ icon, text, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors ${
      active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </button>
);

const StatCard = ({ title, value, change, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-500">
        {title}
      </CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500 mt-1">{change}</p>
    </CardContent>
  </Card>
);

export default AdminDashboard;
