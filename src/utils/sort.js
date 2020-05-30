import {SortType} from '../сonst.js';

const getDefaultSortEvents = (events) => {
  return events.slice().sort(function (a, b) {
    return a.time.start.getTime() - b.time.start.getTime();
  });
};

const getTimeSortEvents = (events) => {
  return events.slice().sort(function (a, b) {
    return (b.time.end.getTime() - b.time.start.getTime()) - (a.time.end.getTime() - a.time.start.getTime());
  });
};

const getPriceSortEvents = (events) => {
  return events.slice().sort(function (a, b) {
    return b.price - a.price;
  });
};

const getSortEvents = (events, sortType) => {
  switch (sortType) {
    case SortType.DEFAULT:
      return getDefaultSortEvents(events);
    case SortType.TIME:
      return getTimeSortEvents(events);
    case SortType.PRICE:
      return getPriceSortEvents(events);
  }

  return events;
};

export {getSortEvents};
