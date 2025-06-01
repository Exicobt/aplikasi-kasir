"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; 
import { CheckCircle, Edit2, Plus, Trash2, Users, Users2, XCircle } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "../components/Table";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const TablePage = () => {
  const [activeTab, setActiveTab] = useState("tables");
  const [tables, setTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter()

  useEffect(() => {
    fetchTable();
  }, []);

  const fetchTable = async () => {
      await fetch("/api/table")
        .then(async (res) => {
          const data = await res.json();
          setTables(data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

  const handleDelete = (item) => {
      const fetchDelete = async () => {
        await fetch("/api/table", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table_id: item.id,
            action: 'delete'
          }),
        });
      };
      toast(
        (t) => (
          <span>
            Yakin hapus data ini?
            <div className="mt-2 flex gap-2">
              <button
                onClick={async () => {
                toast.dismiss(t.id);
                await fetchDelete();
                await fetchTable();
                toast.success(`Berhasil menghapus meja ${item.table_number}`);
              }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Ya
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Batal
              </button>
            </div>
          </span>
        ),
        {
          duration: 10000,
        }
      );
    };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="flex pt-16">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-6 pl-[calc(4px*70)]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Manajemen Meja
                </h2>
                <p className="text-gray-600">Kelola Meja makanan dan minuman</p>
              </div>
              <button
                onClick={() => router.push("/dashboard/table/tambah")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Tambah Meja
              </button>
            </div>

            {/* statistik */}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex gap-5 items-center bg-white p-5 rounded-lg shadow-md">
                <div className="p-2 w-10 h-10 rounded-md bg-yellow-300/30">
                  <Users2 className="text-yellow-400" />
                </div>
                <div className="flex flex-col">
                  Total Meja
                  <span className="font-bold text-xxl">
                    { tables.length }
                  </span>
                </div>
              </div>
              <div className="flex gap-5 items-center bg-white p-5 rounded-lg shadow-md">
                <div className="p-2 w-10 h-10 rounded-md bg-green-300/30">
                  <CheckCircle className="text-green-400" />
                </div>
                <div className="flex flex-col">
                  Tersedia
                  <span className="font-bold text-xxl">
                    {
                      tables.filter((table) => table.status === "available")
                        .length
                    }
                  </span>
                </div>
              </div>
              <div className="flex gap-5 items-center bg-white p-5 rounded-lg shadow-md">
                <div className="p-2 w-10 h-10 rounded-md bg-blue-300/30">
                  <Users className="text-blue-400" />
                </div>
                <div className="flex flex-col">
                  Ditempati
                  <span className="font-bold text-xxl">
                    {
                      tables.filter((table) => table.status === "occupied")
                        .length
                    }
                  </span>
                </div>
              </div>
              <div className="flex gap-5 items-center bg-white p-5 rounded-lg shadow-md">
                <div className="p-2 w-10 h-10 rounded-md bg-red-300/30">
                  <XCircle className="text-red-400" />
                </div>
                <div className="flex flex-col">
                  Tidak Tersedia
                  <span className="font-bold text-xxl">
                    {
                      tables.filter((table) => table.status === "not_available")
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* cari */}

            <div className="flex justify-center items-center bg-white p-4 rounded-md shadow-md">
              <input
                type="text"
                placeholder="Cari nomor meja"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-200 w-full p-2 rounded-md"
              />
            </div>

            {/* tabel meja */}

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Meja</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead className={"text-center"}>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tables
                      .filter((table) =>
                        table.table_number
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      )
                      .map((table, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{index+1}</TableCell>
                          <TableCell>{table.table_number}</TableCell>
                          <TableCell>{table.status}</TableCell>
                          <TableCell>
                            {String(table.location).replace("_", " ")}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center items-center gap-2">
                              <button
                                onClick={() => {
                                  router.push(`table/update/${table.id}`);
                                }}
                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(table)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
