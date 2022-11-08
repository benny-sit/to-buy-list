import React, { useState, useEffect, useLayoutEffect } from "react";
import { ListItemType, listLoginType } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { useList } from "../ListContext";
import { BsCartCheck, BsXSquare, BsCheckSquare } from "react-icons/bs";
import { IoPencil } from "react-icons/io5";
import ListItem from "./ListItem";
import { convertDate } from "../utils/GlobalFuncs";

const EmptyItem = { _id: "", name: "", qty: 1, updatedAt: "" };

export default function BuyList() {
  const [listAuth, setListAuth] = useState<listLoginType>();
  const navigate = useNavigate();
  const server = useList();
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<ListItemType>(EmptyItem);
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const lastlist: string | null = window.localStorage.getItem("lastList");
    if (lastlist !== null) {
      const listlogin = JSON.parse(lastlist);
      setListAuth(listlogin);
      if (!server.list) {
        server
          .login(listlogin)
          .then(function (response: any) {
            console.log(response);
          })
          .catch((e: any) => {
            console.log(e);
            navigate("/get-in", { replace: true });
          });
      }
    } else {
      navigate("/get-in", { replace: true });
    }
  }, []);

  useLayoutEffect(() => {
    if (server.list?.updatedAt !== undefined) {
      setLastUpdate(convertDate(server.list.updatedAt));
    }
    const updateTime = setInterval(() => {
      if (server.list?.updatedAt !== undefined) {
        setLastUpdate(convertDate(server.list.updatedAt));
      }
    }, 10000);

    return () => {
      clearInterval(updateTime);
    };
  }, [server.list]);

  const resetNewItem = () => {
    setNewItem(EmptyItem);
    setShowAdd(false);
  };

  function handleAdd() {
    server.createItem(newItem);

    resetNewItem();
  }

  function handleClear() {
    server.deleteAllItems();
  }

  return (
    <div className="flex flex-col relative md:mt-2 w-full">
      <div className="flex justify-between md:mx-6 items-center bg-white p-2 shadow-md">
        <span className="text-3xl mx-3 text-gray-700">
          {server.list?.name}
          <span className="text-gray-300 ml-1 text-xl">List</span>
        </span>
        <div className="flex grow justify-end gap-2">
          <span className="text-gray-300 text-xs md:text-sm">{lastUpdate}</span>
          {/* <button className="bg-slate-300 py-2 px-4 rounded-md shadow-sm hover:ring-1 hover:ring-lime-500 hover:bg-green-300/75 hover:text-black text-gray-600"
          onClick={() => {}}
          >
            Clear All
          </button> */}
        </div>
      </div>
      <hr className="my-3 mx-6" />
      <div className="bg-white mx-2 md:mx-6 py-2 md:px-2 shadow-sm hover:shadow-md">
        <div className="text-2xl text-gray-600 mx-4 flex">
          <span>Items To Buy</span>
          <span className="grow flex justify-end">
            <button
              className="flex gap-1 rounded-md text-lg border-2 px-2 border-green-200 items-center hover:text-gray-800 hover:bg-slate-50 hover:border-green-300"
              onClick={handleClear}
            >
              <span>all</span>
              <BsCartCheck />
            </button>
          </span>
        </div>
        <hr className="mx-4 my-1" />
        <ul className="text-gray-600 mx-6 ">
          {server.list?.items.map((item, idx) => {
            return (
              <ListItem key={`${item._id}-${item.updatedAt}`} item={item} />
            );
          })}
          <li
            style={{ maxHeight: `${showAdd ? "100px" : "0px"}` }}
            className="overflow-hidden transition-all duration-300 flex-wrap"
          >
            <div className="border-b-2 border-transparent hover:text-gray-800 hover:border-gray-100 p-1 flex gap-2 items-center group flex-wrap">
              <input
                type="number"
                value={newItem.qty}
                className="max-w-[5rem] outline-none focus:ring-1 px-1 bg-slate-100"
                onChange={(e) =>
                  setNewItem((prev) => {
                    if (+e.target.value >= 0 || e.target.value === "") {
                      return { ...prev, qty: +e.target.value };
                    }
                    return prev;
                  })
                }
              />
              <input
                type="text"
                value={newItem.name}
                className="outline-none px-1 bg-slate-100 placeholder:text-sm"
                placeholder="item name"
                onChange={(e) =>
                  setNewItem((prev) => {
                    return { ...prev, name: e.target.value };
                  })
                }
              />
              {/* <span className="text-gray-400">New Item</span> */}
              <span className="grow flex justify-end gap-3 text-lg">
                <button
                  className="flex gap-1 rounded-md items-center hover:text-yellow-600"
                  onClick={resetNewItem}
                >
                  <span>dismiss</span>
                  <BsXSquare />
                </button>
                <button
                  className="flex gap-1 rounded-md items-center hover:text-green-700"
                  onClick={handleAdd}
                >
                  <span>create</span>
                  <BsCheckSquare />
                </button>
              </span>
            </div>
          </li>
        </ul>
        <button
          className="bg-green-200 py-2 px-3 ml-6 mt-2 rounded-md shadow-sm hover:ring-1 hover:ring-lime-500 hover:bg-green-300/75 hover:text-black text-gray-600 text-sm"
          onClick={() => setShowAdd((prev) => !prev)}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
