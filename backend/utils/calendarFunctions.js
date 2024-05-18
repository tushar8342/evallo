const { google } = require('../config/googleConfig');

const listEvents = (auth, var_arr) => {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        console.log("Upcoming 10 events:", events);
        events.map((event) => {
          var_arr.push(event);
        });
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
};

const createEvent = (auth, eventDetails) => {
  const calendar = google.calendar({ version: "v3", auth });

  const eventStartTime = new Date();
  eventStartTime.setDate(eventStartTime.getDay() + 2);

  const eventEndTime = new Date();
  eventEndTime.setDate(eventEndTime.getDate() + 2);
  eventEndTime.setMinutes(eventEndTime.getMinutes() + 60);

  const event = {
    summary: eventDetails.summary,
    description: eventDetails.description,
    colorId: 6,
    start: { dateTime: eventStartTime },
    end: { dateTime: eventEndTime },
  };

  calendar.freebusy.query(
    {
      resource: {
        timeMin: eventStartTime,
        timeMax: eventEndTime,
        items: [{ id: "primary" }],
      },
    },
    (err, res) => {
      if (err) return console.error("Free Busy Query Error: ", err);

      const eventArr = res.data.calendars.primary.busy;
      if (eventArr.length === 0) {
        return calendar.events.insert(
          { calendarId: "primary", resource: event },
          (err) => {
            if (err) return console.error("Error Creating Calendar Event:", err);
            return console.log("Event created successfully.");
          }
        );
      }
      return console.log(`Sorry I'm busy for that time...`);
    }
  );
};

module.exports = {
  listEvents,
  createEvent,
};
