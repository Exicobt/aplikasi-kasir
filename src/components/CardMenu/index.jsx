'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

const CardMenu = ({ view, data }) => {

    const [detailMenu, setDetailMenu] = useState(null)

    useEffect(() => {
        if(detailMenu) {
            console.log("Detail Menu:", detailMenu)
        }
    }, [detailMenu])

    const getMenu = (menu) => {
        setDetailMenu(menu)
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
                  : "flex w-20 items-center "
              } w-full shadow rounded-sm overflow-hidden gap-3 bg-white`}
              onClick={() => getMenu(item)}
              key={index}
            >
              <Image
                src={"https://placehold.co/1000x1000/png"}
                alt=""
                width={100}
                height={100}
                className={`${view === "grid" ? "w-full" : "w-20"}`}
              />
              <h2 className="text-center capitalize">{item?.title}</h2>
            </div>
        );
      })}
    </div>
  );
};

export default CardMenu;
