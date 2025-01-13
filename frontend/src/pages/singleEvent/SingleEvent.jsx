import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { fetchSingleEvent } from "../../store/slices/eventSlice";
import { createAndUpdateRsvp, fetchRsvpByEvent } from "../../store/slices/rsvpSlice";
Modal.setAppElement("#root");
const SingleEvent = () => {
    const { eventID } = useParams();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const { event, isLoading, error } = useSelector((state) => state.event);
    const { rsvps, loading: rsvpLoading, error: rsvpError } = useSelector((state) => state.rsvp);
    // const rsvp =rsvps.data.attendees;
    // console.log("rsvp array is in component", rsvp);
    console.log("rsvps array is in component", rsvps);
    const user = useSelector((state) => state.user?.user);
    const userID = user?.id;

    useEffect(() => {
        dispatch(fetchSingleEvent(eventID));
    }, [dispatch, eventID]);

    const handleSeelist = (eventID) => {
        dispatch(fetchRsvpByEvent(eventID));
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);

    const handleRsvp = (userID, eventID) => {
        const confirmed = window.confirm("Are you sure you want to RSVP for this event?");
        if (confirmed) {
            dispatch(createAndUpdateRsvp({ userID, eventID }));
        }
    };

    if (isLoading) return <div className="text-center mt-10">Loading event...</div>;
    if (error) return <div className="text-center mt-10 text-red-500">Failed to load event.</div>;
    if (!event) return <div className="text-center mt-10">No event found with this ID.</div>;

    const organizerName = event.data.created_by === userID ? user?.name : "Unknown Organizer";

    return (
        <>
            <div className="bg-gray-100 min-h-screen py-10">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Event Banner */}
                    <div className="relative">
                        <img
                            src={event.data.image || "https://via.placeholder.com/1200x400"}
                            alt="Event Banner"
                            className="w-full h-60 object-cover"
                        />
                        <div className="absolute bottom-4 left-6 text-white">
                            <h1 className="text-3xl font-bold">{event.data.title}</h1>
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
                        <p className="text-gray-600 mb-6">{event.data.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded shadow">
                                <h3 className="font-semibold">Date & Time</h3>
                                <p>{new Date(event.data.date).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded shadow">
                                <h3 className="font-semibold">Location</h3>
                                <p>{event.data.location}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded shadow">
                                <h3 className="font-semibold">Organizer</h3>
                                <p>{organizerName}</p>
                            </div>
                        </div>
                    </div>

                    {/* Join Event Section */}
                    <div className="p-6 bg-gray-50">
                        <h2 className="text-2xl font-semibold mb-4">Join the Event</h2>
                        <button
                            className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-500"
                            onClick={() => handleRsvp(userID, eventID)}
                        >
                            Join
                        </button>
                        <button
                            className="bg-gray-300 text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-400 ml-4"
                            onClick={() => handleSeelist(eventID)}
                        >
                            See List
                        </button>
                    </div>
                </div>
            </div>

            <Modal
    isOpen={showModal}
    onRequestClose={closeModal}
    className="bg-white max-w-2xl mx-auto p-6 rounded shadow-lg mt-20"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
>
    <h2 className="text-2xl font-semibold mb-4">RSVP List</h2>
    {rsvpLoading ? (
        <div>Loading attendees...</div>
    ) : rsvpError ? (
        <div className="text-red-500">{rsvpError.message}</div>
    ) : rsvps.data && rsvps.data.attendees.length > 0 ? (
        <ul className="list-disc pl-6">
            {rsvps.data.attendees.map((attendee) => (
                <li key={attendee._id}>
                    {attendee.name} - {attendee.email}
                </li>
            ))}
        </ul>
    ) : (
        <div>No attendees found.</div>
    )}
    <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
        onClick={closeModal}
    >
        Close
    </button>
</Modal>

        </>
    );
};

export default SingleEvent;
