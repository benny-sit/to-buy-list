import React, { useState, useEffect } from "react";
import {
  BsCartCheck,
  BsCartX,
  BsCheckSquare,
  BsTrash,
  BsCheck2,
} from "react-icons/bs";
import { IoPencil } from "react-icons/io5";
import { ListItemType } from "../utils/types";
import { convertDate } from "../utils/GlobalFuncs";
import { useList } from "../ListContext";

type ListItemProps = {
  item: ListItemType;
};

export default function ListItem({ item }: ListItemProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [itemCopy, setItemCopy] = useState(item);
  const [lastUpdate, setLastUpdate] = useState(convertDate(item.updatedAt));
  const { updateItem, deleteItem } = useList();

  async function handleUpdate() {
    const error = await updateItem(itemCopy);
    setIsEdit(false);
  }

  async function handleDelete() {
    const error = await deleteItem(item);
    setIsEdit(false);
  }

  useEffect(() => {
    const updateTime = setInterval(() => {
      setLastUpdate(convertDate(item.updatedAt));
    }, 60000);

    return () => {
      clearInterval(updateTime);
    };
  }, []);

  return (
    <li className="border-b-2 border-transparent hover:text-gray-800 hover:border-gray-100 p-0 md:p-1 flex mt-1 md:gap-2 items-center group flex-wrap relative justify-between">
      {isEdit ? (
        <>
          <input
            type="number"
            value={itemCopy.qty}
            className="max-w-[5rem] outline-none focus:ring-1 px-1 bg-slate-100"
            onChange={(e) =>
              setItemCopy((prev) => {
                if (+e.target.value >= 0 || e.target.value === "") {
                  return { ...prev, qty: +e.target.value };
                }
                return prev;
              })
            }
          />
          <input
            type="text"
            value={itemCopy.name}
            className="outline-none px-1 bg-slate-100"
            onChange={(e) =>
              setItemCopy((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          <span className="grow flex justify-end gap-3 text-lg">
            <button
              className="flex gap-1 rounded-md items-center hover:text-red-700"
              onClick={handleDelete}
            >
              <span>delete</span>
              <BsCartX />
            </button>
            <button
              className="flex gap-1 rounded-md items-center hover:text-green-700"
              onClick={handleUpdate}
            >
              <span>update</span>
              <BsCheckSquare />
            </button>
          </span>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:gap-3 md:items-center">
            <div className="flex gap-1">
              <span className="text-slate-400 ml-1">{item.qty}</span>
              <span className="">{item.name}</span>
            </div>
            <span className="text-gray-300 text-xs group-hover:max-h-[100px] max-h-0 overflow-hidden transition-all">
              {lastUpdate}
            </span>
          </div>
          <span className="md:grow flex justify-end gap-3 text-xl ">
            <button
              className="group-hover:visible invisible text-gray-600"
              onClick={() => setIsEdit(true)}
            >
              <IoPencil />
            </button>
            <button className="hover:text-green-600" onClick={handleDelete}>
              <BsCheck2 />
            </button>
          </span>
        </>
      )}
    </li>
  );
}
