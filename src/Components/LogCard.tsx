import React, { useState } from "react";
import {
  AiOutlineLock,
  AiOutlineContainer,
  AiOutlineSwap,
} from "react-icons/ai";
import "./spinner.css";
import { useList } from "../ListContext";
import { useNavigate } from "react-router-dom";

export default function LogCard() {
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const server = useList();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError('');
    setLoading(true);

    let err;
    if (isCreate) {
      console.log("Create");
      err = await server.createList({ name, password });
    } else {
      err = await server.login({ name, password });
    }
    setLoading(false);

    if (err) {
      setError(err);
    } else {
      navigate('/', {replace: true})
    }

  }

  return (
    <div className="self-center bg-white shadow-md p-6 border-b-4 hover:border-b-8 text-gray-700 rounded-sm max-w-full">
      <div className="text-2xl mb-3">
        {isCreate ? "Create List" : "Open List"}
      </div>
      <div className={`overflow-hidden mb-2 transition-all duration-1000`} style={{maxHeight: `${error !== '' ? '100px' : '0'}`}}>
        <div className="bg-red-400/90 border-2 border-red-500 shadow-inner text-white p-2">
          {error}
        </div>
      </div>
      <div className="flex flex-col">
        <form className="flex flex-col gap-4 mb-1" onSubmit={handleSubmit}>
          <span className="relative flex group grow">
            <AiOutlineContainer className="absolute self-center right-0 text-slate-400 group-hover:text-slate-600" />
            <input
              type="text"
              placeholder="List Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="outline-none pr-4 border-b-2 placeholder:text-slate-400 placeholder:italic grow"
              required
            />
          </span>
          <span className="relative flex group grow">
            <AiOutlineLock className="absolute self-center right-0 text-slate-400 group-hover:text-slate-600" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="List Password"
              className="outline-none pr-4 border-b-2 placeholder:text-slate-400 placeholder:italic grow"
              required
            />
          </span>
          <button
            disabled={loading}
            type="submit"
            className={` ${
              isCreate
                ? "bg-blue-200 hover:bg-blue-400 hover:text-white"
                : "bg-green-200 hover:bg-green-400 hover:text-white"
            } flex items-center py-1 justify-center rounded-sm`}
          >
            {loading ? (
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : isCreate ? (
              "Create"
            ) : (
              "Open"
            )}
          </button>
        </form>
        <button
          className="flex justify-center items-center gap-1 bg-slate-200 hover:bg-slate-300"
          onClick={() => setIsCreate((prev) => !prev)}
        >
          <AiOutlineSwap />
          {isCreate ? "Open List" : "Create List"}
        </button>
      </div>
    </div>
  );
}
