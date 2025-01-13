const Event  = require("../models/eventModal");
const {response} = require("express");

const fetchEvents = async (req, res) => {
  try {
      const userId = req.user?.userId || req.body.user?.userId;
      console.log('User ID is in fetch events:', userId);

      if (!userId) {
          return res.json({
              data: [],
              status: "error",
              error: "User ID is required.",
          });
      }

      
      const query = {
        $or: [
            { visibility: "public" }, 
            { created_by: userId },
        ],
    };
  
      const allEvents = await Event.find(query);
      res.json({
          data: allEvents,
          status: "success",
      });
  } catch (error) {
      console.error('Error fetching events:', error.message);
      res.json({
          data: [],
          status: "error",
          error: error.message,
      });
  }
};


const fetchUpcomingEvents = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
    
  
      const upcomingEvents = await Event.find({
        date: { $gte: today },
      }).sort({ date: 1 }); 
  
      res.json({
        data: upcomingEvents,
        status: "success",
      });
    } catch (error) {
      res.json({
        data: [],
        status: "error",
        error: error.message,
      });
    }
  };
  

  const fetchPastEvents = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); 
  
      const pastEvents = await Event.find({
        date: { $lt: today },
      }).sort({ date: -1 }); 
  
      res.json({
        data: pastEvents,
        status: "success",
      });
    } catch (error) {
      res.json({
        data: [],
        status: "error",
        error: error.message,
      });
    }
  };
  

  const fetchEventsByDate = async (req, res) => {
    try {
      const { date } = req.params;
  
      let events;
  
      if (date) {
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0); 
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + 1);
  
        
        events = await Event.find({
          date: {
            $gte: selectedDate,
            $lt: nextDay,
          },
        }).sort({ date: 1 }); 
      } else {
        
        events = await Event.find().sort({ date: 1 });
      }
  
      res.json({
        data: events,
        status: "success",
      });
    } catch (error) {
      res.json({
        data: [],
        status: "error",
        error: error.message,
      });
    }
  };
  
  const fetchEventsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      if (!category) {
        return res.json({
          data: [],
          status: "error",
          error: "Category is required.",
        });
      }
  
      const events = await Event.find({
        category: { $regex: new RegExp(`^${category}$`, 'i') },
      }).sort({ date: 1 });
  
      res.json({
        data: events,
        status: "success",
      });
    } catch (error) {
      res.json({
        data: [],
        status: "error",
        error: error.message,
      });
    }
  };
  
const fetchBySearch = async (req, res) => {
    try {
      const { search } = req.query;;
        if (!search) {
            return res.json({
                data: [],
                status: "error",
                error: "Search query is required.",
            });
        }
        const events = await Event.find({
            $or: [
                { title: { $regex: new RegExp(search, 'i') } },
                { description: { $regex: new RegExp(search, 'i') } },
                { location: { $regex: new RegExp(search, 'i') } },
                { category: { $regex: new RegExp(search, 'i') } },
            ],
        }).sort({ date: 1 });
        res.json({
            data: events,
            status: "success",
        });
    } catch (error) {
        res.json({
            data: [],
            status: "error",
            error: error.message,
        });
    }
}


const singleEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        res.json({
            data: event,
            status: "success",
        });
    } catch (error) {
        res.json({
            data: [],
            status: "error",
            error: error.message,
        });
    }
};

  const createEvents = async (req, res) => {
    try {
        const { title, description, date, location, category, visibility ,created_by,image } = req.body;

        
        if (!title || !date || !location || !category || !visibility || !created_by || !image) {  
            return res.status(400).json({
                data: null,
                status: "error",
                message: "All required fields must be provided",
            });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            location,
            category,
            image,
            created_by,
            visibility,
        });

        
        const savedEvent = await newEvent.save();

        
        res.status(201).json({
            data: savedEvent,
            status: "success",
            message: "Event created successfully",
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            status: "error",
            message: error.message,
        });
    }
};


const updateEvents = async (req,res)=>{
    try{
        let updateId= req.params?.id;
        console.log('Update ID:', updateId);
        let updateData=req.body;
        console.log('Update Data:', updateData);
        let updateEvent= await Event.updateOne({_id:updateId}, updateData);
        res.json({
            data:updateEvent,
            status:"success"
        })

    }catch (error){
        res.json({
            data:[],
            status:"error",
            error:error
        })
    }
}

const deleteEvents = async (req,res)=>{
    try{
        const deleteId =  req.params.id;
        const deleteEvent = await  Event.deleteOne({_id:deleteId});
        res.json({
            data:deleteEvent,
            status:"success",

        })
    }catch (error) {
        res.json({
            data:[],
            status:"error",
            error:error

        })
    }
}

module.exports={
    fetchEvents,
    createEvents,
    updateEvents,
    deleteEvents,
    fetchUpcomingEvents,
    fetchPastEvents,
    fetchEventsByDate,
    fetchEventsByCategory,
    fetchBySearch,
    singleEvent,
    
}