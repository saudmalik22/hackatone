import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchEvents, fetchUpcomingEvents, fetchPastEvents, fetchEventsByCategory, fetchEventsByDate, fetchBySearch, deleteEvent } from "../../store/slices/eventSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Events = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.user.id);
    console.log("userId in events:", userId);
    const eventData = useSelector((state) => state.event.events);
    console.log("eventData in events:", eventData);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterOption, setFilterOption] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");


    useEffect(() => {
        if (filterOption === "upcoming") {
            dispatch(fetchUpcomingEvents());
        } else if (filterOption === "past") {
            dispatch(fetchPastEvents());
        } else if (category) {
            console.log("categoryin events" ,category);
            dispatch(fetchEventsByCategory({ category }));
        } else if (date) {
            dispatch(fetchEventsByDate({ date }));
        } else if (searchTerm) {
            dispatch(fetchBySearch({ searchTerm }));
        }
        else {
            dispatch(fetchEvents({ userId }));
        }
    }, [filterOption, dispatch, category, date, userId, searchTerm]);

    const handleUpdate = (id) => {
        const event = eventData.data.filter((event) => event._id === id);
        console.log("Event to update:", event);
        navigate(`/updateEvent/${id}`, { state: event[0] });
    }
    
    const handleDelete=(_id)=>{
        console.log('button is clicked', _id);
        dispatch(deleteEvent(_id)).then(()=>{
            dispatch(fetchEvents(userId));
        });
        
    }

    const handleSearchChange = (event) => {

        setSearchTerm(event.target.value);

    };

    const toggleFilterDropdown = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const applyFilter = (filter) => {
        setFilterOption(filter);
        setIsFilterOpen(false);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleSingleEvent = (eventID) => {
        navigate(`/singleEvent/${eventID}`);

    };

    const filteredEvents = eventData?.data?.filter((event) => {
        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        if (filterOption === "upcoming") {
            const eventDate = new Date(event.date);
            matchesFilter = eventDate >= new Date();
        } else if (filterOption === "past") {
            const eventDate = new Date(event.date);
            matchesFilter = eventDate < new Date();
        }
        if (category) {
            matchesFilter = matchesFilter && event.category === category;
        }


        if (date) {
            const eventDate = new Date(event.date).toLocaleDateString();
            matchesFilter = matchesFilter && eventDate === new Date(date).toLocaleDateString();
        }
        return matchesSearch && matchesFilter;
        
    });

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-6">

                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>


                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="webinar">webinar</option>
                    <option value="conference">conference</option>
                    <option value="seminar">seminar</option>
                    <option value="meetup">meetup</option>
                    <option value="workshop">workshop</option>
                    <option value="tech">tech</option>

                </select>


                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />

                {/* Filter Button */}
                <div className="relative">
                    <button
                        onClick={toggleFilterDropdown}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Filters
                    </button>


                    {isFilterOpen && (
                        <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg mt-2 w-40">
                            <ul>
                                <li
                                    onClick={() => applyFilter("upcoming")}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Upcoming Events
                                </li>
                                <li
                                    onClick={() => applyFilter("past")}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    Past Events
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>


            <div className="container mx-auto py-10 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents?.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div
                                key={event._id}
                                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={event.image || 'https://via.placeholder.com/400x200?text=Event'}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-white">
                                    <h2 className="text-xl font-bold">{event.title}</h2>
                                </div>
                                <div className="p-6">
                                    <div className="text-sm text-gray-500 space-y-2">
                                        <p>
                                            <span className="font-semibold">Location:</span>{" "}
                                            {event.location}
                                        </p>
                                        <p>
                                            <span className="font-semibold">Category:</span>{" "}
                                            {event.category}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-4">
                                <div className="flex justify-between items-center">
                                    <button
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                                        onClick={() => handleSingleEvent(event._id)}
                                    >
                                        <FontAwesomeIcon icon={faEye} className="mr-2" /> View Details
                                    </button>
                                   { console.log("createdby:", event.created_by)}
                                    {userId === event.created_by && (
                                        
                                    <div className="flex gap-4">
                                        <button className="text-blue-500 hover:text-blue-600" onClick={()=>handleUpdate(event._id)}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-600" onClick={()=>handleDelete(event._id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p>No events found</p>
                    )}
                </div>
            </div>
        </>
    );
};
