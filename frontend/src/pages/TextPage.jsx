import React, { useState } from "react";

const TextPage = () => {
  const [count, setCount] = useState(10);
  const [status, setStatus] = useState("online");
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px] h-[500px] bg-amber-100 text-white flex flex-col justify-center items-center gap-[25px]">
        <div className="flex justify-center items-center  gap-[20px]">
          <button
            className="w-[100px] bg-accent h-[40px] rounded-lg"
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </button>
          <span className="text-accent text-5xl">{count}</span>
          <button
            className="w-[100px] bg-accent h-[40px] rounded-lg"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <span className="text-accent text-5xl">{status}</span>
          <div className="flex flex-row gap-[20px]">
            <button
              onClick={() => {
                setStatus("online");
              }}
              className="w-[100px] bg-accent h-[40px] rounded-lg"
            >
              online
            </button>
            <button
              onClick={() => {
                setStatus("offline");
              }}
              className="w-[100px] bg-accent h-[40px] rounded-lg"
            >
              offline
            </button>
            <button
              onClick={() => {
                setStatus("deactivated");
              }}
              className="w-[100px] bg-accent h-[40px] rounded-lg"
            >
              deactivated
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextPage;
