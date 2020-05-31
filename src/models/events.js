import {FilterType, SortType} from '../сonst.js';
import {getEventsByFilter} from '../utils/filter.js';
import {getSortEvents} from '../utils/sort.js';
import {ONE_DAY_IN_MS} from '../сonst.js';

class Events {
  constructor() {
    this._events = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._activeSortType = SortType.DEFAULT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    return getEventsByFilter(getSortEvents(this._events, this._activeSortType), this._activeFilterType);
  }

  getEventsAll() {
    return this._events;
  }

  getEventsWithDays() {
    const events = this.getEvents();

    if (events.length !== 0) {
      const firstDay = getSortEvents(this._events, SortType.DEFAULT)[0].time.start;
      firstDay.setHours(0, 0, 0, 0);
      events.forEach((event) => {
        const startTime = event.time.start;
        const day = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate());
        event.day = (day.getTime() - firstDay.getTime()) / ONE_DAY_IN_MS + 1;
      });
    }

    return events;
  }

  setEvents(events) {
    this._events = events;

    this._callHandlers(this._dataChangeHandlers);
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((modelsEvent) => {
      return modelsEvent.id === id;
    });

    if (index === -1) {
      return index;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return index;
  }

  removeEvent(id) {
    const index = this._events.findIndex((modelsEvent) => {
      return modelsEvent.id === id;
    });

    if (index === -1) {
      return index;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return index;
  }

  addEvent(event) {
    this._events = [].concat(this._events.slice(), event);

    this._callHandlers(this._dataChangeHandlers);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setSort(sortType) {
    this._activeSortType = sortType;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export default Events;
