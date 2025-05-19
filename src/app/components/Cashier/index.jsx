"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";

const Cashier = ({ orders }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [orderType, setOrderType] = useState("");
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const pajak = 0.11;
  const totalItem = allOrders.reduce((sum, item) => sum + item.qty, 0);
  const totalHarga = allOrders.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );
  const hargaTotal = totalHarga + totalHarga * pajak;

  const updateQuantity = (nama, newQuantity) => {
    if (newQuantity < 1) return;
    setAllOrders((prev) =>
      prev.map((item) =>
        item.nama === nama ? { ...item, qty: newQuantity } : item
      )
    );
  };

  const selectOrder = async () => {
    if (orderType === "") {
      toast.error("Isi jenis order terlebih dahulu");
      return;
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produk: { allOrders },
          type: orderType,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan pesanan");
      }

      const data = await response.json();
      toast.success("Pesanan berhasil disimpan!");
      setAllOrders([]);
      setOrderType("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal menyimpan pesanan");
    }
  };

  const hapusItem = (item) => {
    setAllOrders((prev) => prev.filter((i) => i.nama !== item));
  };

  const hapusSemuaMenu = () => {
    setAllOrders([]);
  };

  useEffect(() => {
    if (orders) {
      const initialOrders = {
        nama: orders.nama,
        harga: orders.harga,
        qty: 1,
      };

      setAllOrders((prev) => {
        const duplikat = prev.find((i) => i.nama === orders.nama);
        if (duplikat) {
          return prev.map((i) =>
            i.nama === orders.nama ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, initialOrders];
      });
    }
  }, [orders]);

  return (
    <div className="lg:w-2/5 bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{totalItem} Items</h2>
        <button
          className="text-destructive hover:bg-destructive/10 p-2 rounded-full"
          onClick={hapusSemuaMenu}
        >
          <Trash size={20} />
        </button>
      </div>

      <div className="mb-6">
        <Select onValueChange={(value) => setOrderType(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Order Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Take Away">Take Away</SelectItem>
            <SelectItem value="Dine In">Dine In</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 flex-1 overflow-y-auto">
        {allOrders.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-black/50">
            Tidak ada pesanan, silahkan memilih produk
          </div>
        ) : (
          <Table className="w-full">
            <TableHeader className="sticky top-0 bg-white">
              <TableRow>
                <TableHead className="text-left w-[20%]">Name</TableHead>
                <TableHead className="text-center w-[20%]">harga</TableHead>
                <TableHead className="text-center w-[20%]">Qty</TableHead>
                <TableHead className="text-center w-[20%]">Total</TableHead>
                <TableHead className="text-center w-[10%]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders.map((order, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="capitalize font-medium text-left px-2 py-3 truncate max-w-[200px]">
                    {order.nama}
                  </TableCell>
                  <TableCell className="text-center px-2 py-3">
                    Rp {parseInt(order.harga).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-center px-2 py-3">
                    <div className="flex items-center justify-center gap-2 mx-auto w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(order.nama, order.qty - 1)
                        }
                        className={`p-1 rounded-full hover:bg-gray-100 ${
                          order.qty === 1 ? "invisible" : "bg-gray-100"
                        }`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="min-w-[20px] text-center">
                        {order.qty}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(order.nama, order.qty + 1)
                        }
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-2 py-3 font-medium">
                    Rp {(order.harga * order.qty).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <button
                      className="text-destructive hover:bg-destructive/10 p-1 rounded-full"
                      onClick={() => hapusItem(order.nama)}
                    >
                      <Trash size={15} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="mt-auto pt-4 border-t">
        <div className="flex justify-between items-end mb-4">
          <div className="text-sm text-black/60">
            <p>Total harga:</p>
            <p>Pajak: </p>
            <p className="text-lg text-black font-semibold">
              Total{" "}
              <span className="text-sm text-black/60 font-normal">
                (pajak {(pajak * 100).toFixed(0)}%)
              </span>
            </p>
          </div>

          <div className="text-right text-black/70 text-sm">
            <p>Rp {totalHarga.toLocaleString("id-ID")}</p>
            <p>
              ({(pajak * 100).toFixed(0)}%) Rp{" "}
              {(totalHarga * pajak).toLocaleString("id-ID")}
            </p>
            <p className="text-highlight text-xl font-bold">
              Rp {hargaTotal.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
        <button
          disabled={allOrders.length === 0 || isLoading}
          className={`w-full py-3 bg-highlight hover:bg-highlight/90 text-white font-semibold rounded-lg transition-colors ${
            allOrders.length === 0 || isLoading
              ? "!bg-gray-300 !text-gray-500 cursor-not-allowed"
              : ""
          }`}
          onClick={selectOrder}
        >
          {isLoading ? "Menyimpan..." : "ORDER"}
        </button>
      </div>
    </div>
  );
};

export default Cashier;
