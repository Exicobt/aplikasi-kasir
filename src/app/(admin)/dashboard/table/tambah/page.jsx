"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Tambah = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tables");
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);
  const [tables, setTables] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/table");
      const data = await res.json();
      setTables(data);
    };

    setFormData({
      table_number: "",
      status: "available",
      location: "lantai 1",
    });

    fetchData();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.table_number) {
      newErrors.table_number = "Nomor meja wajib diisi";
    }

    if (!formData.status) {
      newErrors.status = "Status wajib dipilih";
    }

    if (!formData.location) {
      newErrors.location = "Lokasi wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/table");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    if (tables.find((t) => t.table_number === (`${formData.location === "lantai 1" ? "A" : "B"}${
          formData.table_number
        }`))) {
      toast.error(
        `Meja dengan nomor ${formData.location === "lantai 1" ? "A" : "B"}${
          formData.table_number
        } sudah ada`
      );
      return
    }

    setUpdating(true);

    try {
      const res = await fetch("/api/table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_number: `${formData.location === "lantai 1" ? "A" : "B"}${
            formData.table_number
          }`,
          status: formData.status,
          location: String(formData.location).replace(" ", "_"),
          action: "create",
        }),
      });

      if (res.ok) {
        toast.success("Data berhasil ditambah");
        router.push("/dashboard/table");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="flex pt-16">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 p-6 pl-[calc(4px*70)]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Tambah Meja
                  </h1>
                  <p className="text-gray-600 mt-1">Tambah informasi meja</p>
                </div>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ← Kembali
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6 mb-6">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="lokasi"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Lokasi meja
                      </label>
                      <select
                        name="location"
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.location ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="lantai 1">Lantai 1</option>
                        <option value="lantai 2">Lantai 2</option>
                      </select>

                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.location}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="table_number"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nomor meja
                      </label>
                      <div className="relative">
                        <span
                          className={`absolute left-0 px-4 py-2 rounded-l-lg h-full ${
                            errors.table_number
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        >
                          {formData.location === "lantai 1" ? "A" : "B"}
                        </span>
                        <input
                          name="table_number"
                          type="number"
                          onChange={handleInputChange}
                          placeholder="Masukkan nomor meja"
                          className={`box-border w-full bg-white border border-gray-200 pl-8 pr-4 py-2 rounded-lg ${
                            errors.table_number
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="lokasi"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Status
                      </label>
                      <select
                        name="status"
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.status ? "border-red-500" : "border-gray-200"
                        }`}
                      >
                        <option value="available">Tersedia</option>
                        <option value="occupied">Ditempati</option>
                        <option value="not_available">Tidak Tersedia</option>
                      </select>

                      {errors.table_number && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.status}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    disabled={updating}
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer"
                  >
                    {updating && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    )}
                    {updating ? "Menyimpan..." : "Update Meja"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tambah;
