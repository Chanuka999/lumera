import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <>
      <div className="h-[700px] w-[700px]  border-[5px] relative flex justify-center items-center">
        <div className="w-[300px] h-[100px] relative bg-blue-400 flex justify-center items-center">
          <button className="bg-red-900 absolute top-[0px] right-[0px] ">
            x
          </button>
          <button className="text-white bg-green-500 fixed bottom-[0px] right-[0px] p-[20px]">
            chat with whatsapp
          </button>
          your time has over
        </div>
        <div className="w-[300px] h-[300px] bg-pink-500 p-[20px] m-[20px]">
          <div className="w-[50px] h-[50px] bg-yellow-500"></div>

          <div className="w-[50px] h-[50px] bg-blue-500"></div>
        </div>
      </div>
    </>
  );
}

export default App;
