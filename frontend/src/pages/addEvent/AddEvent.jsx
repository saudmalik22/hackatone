import  { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "../../store/slices/eventSlice";
export default function AddEvent() {
  const [id, setId] = useState(30);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const eventData = {
        id:id,
        title,
        description,
        date,
        location,
        category,
        visibility,
        created_at: new Date().toISOString(),

      }
      console.log("Event Data:", eventData);
      dispatch(addEvent(eventData));
      setId(prevId => prevId + 1);
    } catch (error) {
        console.error("Error:", error);
    };
      
   
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center">Add Event</h1>
        <p className="text-gray-600 text-center mt-2">
          Provide the event details to create a new event.
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event Title"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event Description"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-28 resize-none"
            />
          </div>

          {/* Date and Location Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="date"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Event Location"
                className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Category and Visibility Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="conference">conference</option>
                <option value="workshop">workshop</option>
                <option value="webinar">webinar</option>
                <option value="meetup">tech</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="visibility"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Visibility
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Visibility</option>
                <option value="public">public</option>
                <option value="private">private</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
