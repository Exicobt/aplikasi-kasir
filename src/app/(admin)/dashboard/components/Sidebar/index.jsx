import { BarChart3, ChefHat, MapPin, DollarSign, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const router = useRouter();

  const handleLogout = async() => {
    await fetch("/api/logout", {
      method: "POST",
    })

    router.push('/')
  }

  return (
    <div className="w-64 bg-white shadow-xl h-screen fixed left-0 top-14">
      <div className="">
        <div className="p-6">
          <nav className="space-y-2">
            {[
              {
                id: "dashboard",
                label: "Dashboard",
                icon: BarChart3,
                route: "/dashboard",
              },
              {
                id: "menu",
                label: "Kelola Menu",
                icon: ChefHat,
                route: "/dashboard/menu",
              },
              {
                id: "tables",
                label: "Kelola Meja",
                icon: MapPin,
                route: "/dashboard/table",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    router.push(item.route);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-orange-500 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
            <div className="h-full flex items-end">
              <button onClick={handleLogout} className='text-red-600 w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all hover:bg-gray-100'>
              <LogOut className="w-5 h-5"/>
              Logout
            </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
