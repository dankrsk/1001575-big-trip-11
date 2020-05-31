import {FilterType} from '../сonst.js';

const getFutureEvents = (events, nowDate) => {
  return events.filter((event) => {
    return event.time.start.getTime() > nowDate.getTime();
  });
};

const getPastEvents = (events, nowDate) => {
  return events.filter((event) => {
    return event.time.start.getTime() < nowDate.getTime();
  });
};

const getEventsByFilter = (events, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.FUTURE:
      return getFutureEvents(events, nowDate);
    case FilterType.PAST:
      return getPastEvents(events, nowDate);
  }

  return events;
};

export {getEventsByFilter};
