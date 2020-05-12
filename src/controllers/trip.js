import {render, RenderPosition, remove} from '../utils/render.js';
import DayEventsComponent from '../components/day-events.js';
import {default as EventController, Mode as EventControllerMode, EmptyEvent} from './event.js';
import {FilterType} from '../сonst.js';

class TripController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._creatingEvent = null;

    this._dayEventsComponents = [];
    this._eventControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.setFilterChangeHandler(this._onFilterChange);
  }

  _removeEvents() {
    this._eventControllers.forEach((it) => {
      it.destroy();
    });
    this._eventControllers = [];
  }

  _removeDayEventsComponents() {
    this._dayEventsComponents.forEach((it) => {
      remove(it);
    });
    this._dayEventsComponents = [];
  }

  _updateEvents() {
    this._removeEvents();
    this._removeDayEventsComponents();
    this.render();
  }

  createEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._onViewChange();

    this._creatingEvent = new EventController(this._container.getElement(), this._onDataChange, this._onViewChange);
    this._creatingEvent.render(EmptyEvent, EventControllerMode.ADDING);
  }

  render() {
    const eventContainer = this._container.getElement();
    const events = this._eventsModel.getEvents();

    if (events) {
      let day = events[0].day;
      let i = 0;
      this._dayEventsComponents.push(new DayEventsComponent(events[0].time.date, day));
      render(eventContainer, this._dayEventsComponents[i], RenderPosition.BEFOREEND);
      let dayEventsList = this._dayEventsComponents[i].getElement().querySelector(`.trip-events__list`);
      events.forEach((it) => {
        if (it.day !== day) {
          i++;
          day = it.day;
          this._dayEventsComponents.push(new DayEventsComponent(it.time.date, day));
          render(eventContainer, this._dayEventsComponents[i], RenderPosition.BEFOREEND);
          dayEventsList = this._dayEventsComponents[i].getElement().querySelector(`.trip-events__list`);
        }

        const eventController = new EventController(dayEventsList, this._onDataChange, this._onViewChange);
        eventController.render(it, EventControllerMode.DEFAULT);
        this._eventControllers.push(eventController);
      });
    }
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onDataChange(oldData, newData, eventController = null) {
    if (oldData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData === null) {
        eventController.destroy();
        this._updateEvents();
      } else {
        this._eventsModel.addEvent(newData);
        this._updateEvents();
      }
    } else if (newData === null) {
      const index = this._eventsModel.removeEvent(oldData.id);
      if (index !== -1) {
        this._updateEvents();
      }
    } else {
      const index = this._eventsModel.updateEvent(oldData.id, newData);

      if (index !== -1) {
        this._eventControllers[index].render(newData, EventControllerMode.DEFAULT);
      }
    }
  }

  _onFilterChange() {
    this._updateEvents();
  }
}

export default TripController;
