

export const Events = () => {
    const events = [
        { id: 1, title: 'Event 1', description: 'Description for event 1' },
        { id: 2, title: 'Event 2', description: 'Description for event 2' },
        { id: 3, title: 'Event 3', description: 'Description for event 3' },
        { id: 4, title: 'Event 4', description: 'Description for event 4' },
    ];

    return (
        <div className="flex flex-wrap">
            {events.map(event => (
               <div key={event._id} className="w-full md:w-1/2 p-4">
               <div className="bg-white shadow-md rounded-lg p-6">
                 <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                 <p className="text-gray-700">{event.description}</p>
                 {/* Add any other event details here */}
                 <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                 <p className="text-sm text-gray-500">Location: {event.location}</p>
                 <p className="text-sm text-gray-500">Category: {event.category}</p>
                 <p className="text-sm text-gray-500">Visibility: {event.visibility}</p>
                 <p className="text-sm text-gray-500">Created by: {event.created_by}</p>
               </div>
             </div>
            ))}
        </div>
    );
};

