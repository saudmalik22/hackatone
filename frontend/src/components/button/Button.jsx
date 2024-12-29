import { Link } from "react-router-dom";


export default function Button() {
  return (
    <div className="flex justify-end">
     <Link to={"/addEvent"}>
     <button className="bg-blue-500 mt-4  mr-4 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
    Add Event
</button>
</Link>
    </div>
  )
}
