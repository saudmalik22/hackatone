import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../store/slices/eventSlice";
import axios from "axios";

const Update = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event = location.state; 

 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [locationField, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Populate form fields with existing event details
  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setDate(event.date || "");
      setLocation(event.location || "");
      setCategory(event.category || "");
      setVisibility(event.visibility || "");
      setImage(event.image || null);
      setPreview(event.image || null);
    }
  }, [event]);

  // Handle image file change and preview
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "event_management");
        formData.append("cloud_name", "dbod2iefp");

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dbod2iefp/image/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const imageUrl = response.data.secure_url;
        setImage(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
     _id: id,
      title,
      description,
      date,
      location: locationField,
      category,
      visibility,
      image,
    };

    dispatch(updateEvent(updatedEvent));
    navigate("/");
  };

  return (
    <div className="container mx-auto max-w-3xl bg-gradient-to-r from-white to-gray-100 shadow-lg rounded-lg p-8 mt-8">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Update Event
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full px-5 py-3 text-gray-700 shadow-sm"
            placeholder="Enter the event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-5 py-3 text-gray-700 shadow-sm"
            placeholder="Provide a detailed description of the event"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Date and Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full px-5 py-3 text-gray-700 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={locationField}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full px-5 py-3 text-gray-700 shadow-sm"
              placeholder="Event location"
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full px-5 py-3 text-gray-700 shadow-sm"
            placeholder="Enter the event category"
            required
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Visibility <span className="text-red-500">*</span>
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-full px-5 py-3 text-gray-700 shadow-sm"
            required
          >
            <option value="" disabled>
              Select visibility
            </option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Event Image
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full text-gray-500 file:rounded-full file:border-none file:bg-indigo-500 file:text-white file:cursor-pointer file:font-semibold file:py-2 file:px-4"
              accept="image/*"
            />
            {preview && (
              <img
                src={preview}
                alt="Event Preview"
                className="w-16 h-16 rounded-lg object-cover border shadow-md"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-8 py-3 rounded-full shadow-md hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Update Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
