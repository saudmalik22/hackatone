import { Link } from "react-router-dom";

export default function Button() {
  return (
    <div className="flex justify-end relative group ">
      <Link to={"/addEvent"}>
        <button className="bg-blue-500 mt-4 mr-4 text-white font-bold w-12 h-12 rounded-full hover:bg-blue-700 flex items-center justify-center shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </Link>
      <div className="absolute wd-12 top-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs font-semibold py-1 px-2 rounded shadow-lg">
        Add Event
      </div>
    </div>
  );
};
