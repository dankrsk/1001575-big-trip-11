import {FilterType} from '../сonst.js';
import {getEventsByFilter} from '../utils/filter.js';

class Events {
  constructor() {
    this._events = [];
    this._activeFilterType = FilterType.EVERYTHING;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getEventsAll() {
    return this._events;
  }

  _addDayToEvents() {
    let day = new Date(1980, 1, 1);
    let i = 0;
    this._events.forEach((it) => {
      if (it.time.date.getMonth() !== day.getMonth() || it.time.date.getDate() !== day.getMonth()) {
        i++;
        day = it.time.date;
        it.day = i;
      } else {
        it.day = i;
      }
    });
  }

  setEvents(events) {
    events.forEach((it, i) => {
      it.forEach((event) => {
        this._events.push(event);
      });
    });

    this._addDayToEvents();
    this._callHandlers(this._dataChangeHandlers);
  }

  updateEvent(id, event) {
    const index = this._events.findIndex((it) => {
      return it.id === id;
    });

    if (index === -1) {
      return index;
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return index;
  }

  removeEvent(id) {
    const index = this._events.findIndex((it) => {
      return it.id === id;
    });

    if (index === -1) {
      return index;
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));

    this._addDayToEvents();
    this._callHandlers(this._dataChangeHandlers);

    return index;
  }

  addEvent(event) {
    let index = null;

    for (let i = 0; i < this._events.length; i++) {
      const it = this._events[i];
      if (event.time.start.getTime() <= it.time.start.getTime()) {
        index = i;
        break;
      }
    }

    this._events = [].concat(this._events.slice(0, index), event, this._events.slice(index));

    this._addDayToEvents();

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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export default Events;
