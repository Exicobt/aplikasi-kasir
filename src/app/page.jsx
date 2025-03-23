"use client";

import { useState } from "react";
import Navbar from "./utils/Navbar";
import CardMenu from "../components/CardMenu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Search from "@/components/ui/search";
import { Trash } from "@phosphor-icons/react/dist/ssr";

const Menu = () => {
  const [views, setViews] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  const menu = [
    { title: "Nasi Goreng", category: "Food", price: 10000 },
    { title: "Mie Rebus", category: "Food", price: 10000 },
    { title: "Es Teh", category: "Drink", price: 5000 },
    { title: "Bakso", category: "Food", price: 15000 },
    { title: "Pudding", category: "Dessert", price: 8000 },
    { title: "Kentang Goreng", category: "Snack", price: 12000 },
  ];

  return (
    <div className="relative pt-15 min-h-screen md:flex gap-1">
      <Navbar placeholder="Menu" view={views} setView={setViews} />
      <div className="relative px-10 bg-white pt-3 w-3/5">
        
        <div className="flex justify-between">
          <Search placeholder={'Product'}/>

            <Select onValueChange={(value) => setActiveCategory(value)} defaultValue={activeCategory}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Drink">Drink</SelectItem>
                  <SelectItem value="Dessert">Dessert</SelectItem>
                  <SelectItem value="Snack">Snack</SelectItem>
                </SelectContent>
            </Select>
        </div>
        
        <div className="mt-10 pb-10 h-full max-h-[480px] overflow-y-scroll">
          {activeCategory === "All" ? (
            <CardMenu view={views} data={menu}/>
          ) : (
            <>
              <CardMenu view={views} data={menu.filter((item) => item.category === activeCategory)} />
            </>
          )}
        </div>
      </div>

      <div className="bg-white flex flex-col px-10 pt-3 pb-10 w-2/5 relative">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold ">2 Barang</p>
          <button className="">
              <Trash size={20} color="var(--destructive)"/>
          </button>
        </div>

        <div className="mt-10">
          <Select>
              <SelectTrigger className="w-full text-center">
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Take Away">Take Away</SelectItem>
                <SelectItem value="Dine In">Dine In</SelectItem>
              </SelectContent>
          </Select>
        </div>

        <div className="mt-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Nasi Goreng</TableCell>
                <TableCell>15.000</TableCell>
                <TableCell>2</TableCell>
                <TableCell className="text-right">30.000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-auto bottom-20 w-full">
          <div className="flex justify-between items-center mb-5">
            Total
            <p className="text-highlight text-xl font-semibold">Rp 30.000</p>
          </div>
          <button className="text-center h-10 w-full bg-highlight text-white font-semibold">ORDER</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
