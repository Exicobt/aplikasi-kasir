"use client";

import { useEffect, useState } from "react";
import Navbar from "../utils/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import Search from "@/app/components/ui/search";
import CardMenu from "@/app/components/CardMenu";
import Cashier from "@/app/components/Cashier";

const Menu = () => {
  const [views, setViews] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [inOrder, setInOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error("Gagal ambil menu:", err);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div className="relative pt-15 min-h-screen md:flex gap-1">
      <Navbar placeholder="Menu" view={views} setView={setViews} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/5 bg-white rounded-lg shadow-sm p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="w-full">
                <Search
                  placeholder={"Product"}
                  searchItem={(val) => setSearchTerm(val)}
                />
              </div>
              <Select
                onValueChange={(value) => setActiveCategory(value)}
                defaultValue={activeCategory}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="foods">Food</SelectItem>
                  <SelectItem value="drinks">Drink</SelectItem>
                  <SelectItem value="snacks">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="h-[calc(100vh-280px)] md:h-[calc(100vh-220px)] overflow-y-auto pb-4">
              {searchTerm !== "" ? (
                <CardMenu
                  view={views}
                  data={menu.filter((item) =>
                    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
                  )}
                  onOrder={(item) => setInOrder(item)}
                />
              ) : activeCategory === "All" ? (
                <CardMenu
                  view={views}
                  data={menu}
                  onOrder={(item) => setInOrder(item)}
                />
              ) : (
                <CardMenu
                  view={views}
                  data={menu.filter((item) => item.kategori === activeCategory)}
                  onOrder={(item) => setInOrder(item)}
                />
              )}
              {}
            </div>
          </div>

          <Cashier orders={inOrder} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
