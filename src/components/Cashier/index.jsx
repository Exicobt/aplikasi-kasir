"use client";

import { CashRegister } from "@phosphor-icons/react/dist/ssr";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const Cashier = () => {
  const [inOrder, setInOrder] = useState([]);

  useEffect(() => {
    
  }, [])

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-top">
      <div className="px-10 py-3">
        <div className="flex justify-start font-poppins">
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Order Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dine-in">Dine In</SelectItem>
              <SelectItem value="take-away">Take Away</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between mt-5">
          <div>
            <p>2 Barang</p>
            <p className="text-highlight text-xl font-poppins">Rp 20.000</p>
          </div>

          <button>
            <CashRegister color="var(--highlight)" size={28} className="before:content-['dwda']" />
          </button>
        </div>
      </div>
      <button className="bg-highlight w-full text-white flex justify-center text-lg px-10 py-3 items-center font-semibold">
        ORDER
      </button>
    </div>
  );
};

export default Cashier;
