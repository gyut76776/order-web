import {
  LayoutDashboard,
  ClipboardList,
  Utensils,
  Users,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: "/admin",
      end: true
    },
    {
      label: "Pesanan",
      icon: ClipboardList,
      to: "/admin/pesanan"
    },
    {
      label: "Menu",
      icon: Utensils,
      to: "/admin/menu"
    },
    {
      label: "Pelanggan",
      icon: Users,
      to: "/admin/pelanggan"
    },
    {
      label: "Barista",
      icon: Users,
      to: "/admin/barista"
    },
    {
      label: "Kitchen",
      icon: Users,
      to: "/admin/kitchen"
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6 flex flex-col">
      <h1 className="text-4xl text-center font-bold mb-8 tracking-wide">
        NILU
      </h1>

      <nav className="space-y-2 flex-1">
        {menu.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-3 py-2 rounded-lg transition 
              ${isActive ? "bg-slate-800" : "hover:bg-slate-800"}`
            }
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={() => console.log()}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-800 transition"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
