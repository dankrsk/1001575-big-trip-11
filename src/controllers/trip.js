import {render, replace, RenderPosition} from '../utils/render.js';
import DayEventsComponent from '../components/day-events.js';
import EventComponent from '../components/event.js';
import EventEditComponent from '../components/event-edit.js';

class TripController {
  constructor(container) {
    this._container = container;
  }

  _renderEvent(dayEventsList, event) {
    const eventComponent = new EventComponent(event);
    const eventEditComponent = new EventEditComponent(event);

    const onRollupButtonClick = () => {
      replace(eventEditComponent, eventComponent);
    };

    const onEditFormSubmit = (evt) => {
      evt.preventDefault();
      replace(eventComponent, eventEditComponent);
    };

    eventComponent.setEditButtonClickHandler(onRollupButtonClick);
    eventEditComponent.seEditFormtSubmitHandler(onEditFormSubmit);

    render(dayEventsList, eventComponent, RenderPosition.BEFOREEND);
  }

  render(events) {
    const eventContainer = this._container.getElement();
    events.forEach((it, i) => {
      const dayEventsComponent = new DayEventsComponent(it[0].time.date, i + 1);
      render(eventContainer, dayEventsComponent, RenderPosition.BEFOREEND);
      const dayEventsList = dayEventsComponent.getElement().querySelector(`.trip-events__list`);

      it.forEach((dayEvent) => {
        this._renderEvent(dayEventsList, dayEvent);
      });
    });
  }
}

export default TripController;
