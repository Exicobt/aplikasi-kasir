'use client'

import Image from "next/image";
import toast from 'react-hot-toast'

const CardMenu = ({ view, data, onOrder }) => {

    const getMenu = (menu) => {
      onOrder(menu)
      toast.success("Menambahkan 1 produk")
    }

  return (
    <div
      className={`${
        view === "list" ? "flex flex-col" : "grid grid-cols-2 md:grid-cols-4"
      } w-full gap-5`}
    >
      {data.map((item, index) => {
        return (
            <div
              className={`${
                view === "grid"
                  ? "flex flex-col pb-5"
                  : "flex w-20 items-center"
              } w-full shadow rounded-sm overflow-hidden gap-3 bg-white`}
              key={index}
            >
              <Image
                src={"https://placehold.co/1000x1000/png"}
                alt=""
                width={100}
                height={100}
                className={`${view === "grid" ? "w-full" : "w-20"}`}
              />
              <div className={`px-4 flex gap-4 w-full h-full justify-between ${view === "grid" ? 'flex-col ': ''}`}>
                <div className="text-sm flex flex-col justify-between h-full w-full gap-2">
                  <h2 className="text-left capitalize font-semibold">{item?.nama}</h2>
                  <p className="text-left text-highlight font-semibold">Rp {parseInt(item?.harga).toLocaleString('id-ID')}</p>
                </div>
                <button onClick={() => getMenu(item)} className="bg-highlight text-white px-4 py-2 rounded font-semibold cursor-pointer text-sm">Tambah</button>
              </div>
            </div>
        );
      })}
    </div>
  );
};

export default CardMenu;
