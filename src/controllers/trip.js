import {render, RenderPosition} from '../utils/render.js';
import DayEventsComponent from '../components/day-events.js';
import EventController from '../controllers/event.js';

class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];
    this._eventControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onViewChange() {
    this._eventControllers.forEach((it) => {
      it.setDefaultView();
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._events.findIndex((it) => {
      return it === oldData;
    });

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    this._eventControllers[index].rerender(this._events[index]);
  }

  render(events) {
    const eventContainer = this._container.getElement();
    events.forEach((it, i) => {
      const dayEventsComponent = new DayEventsComponent(it[0].time.date, i + 1);
      render(eventContainer, dayEventsComponent, RenderPosition.BEFOREEND);
      const dayEventsList = dayEventsComponent.getElement().querySelector(`.trip-events__list`);

      it.forEach((dayEvent) => {
        const eventController = new EventController(dayEventsList, this._onDataChange, this._onViewChange);
        eventController.render(dayEvent);
        this._eventControllers.push(eventController);
        this._events.push(dayEvent);
      });
    });
  }
}

export default TripController;
