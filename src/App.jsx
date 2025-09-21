import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex gap-8 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="transition-transform hover:scale-110"
        >
          <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="transition-transform hover:scale-110"
        >
          <img
            src={reactLogo}
            className="w-16 h-16 animate-spin"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Vite + React + Tailwind
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">src/App.jsx</code> and
          save to test HMR
        </p>
      </div>
      <p className="text-gray-500 mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
